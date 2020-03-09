import { takeEvery, call, put, all } from 'redux-saga/effects'
import {
  authService,
  dataBaseService,
  storageService
} from '../servicios/firebase'
import {
  GET_POSTS,
  REGISTER,
  LOGIN,
  CREATE_POST,
  SET_LIKE,
  SET_COMMENTS,
  GET_COMMENTS
} from '../actions/types'
import {
  setTimeline,
  setAuthors,
  fetchTimeline,
  setLike,
  setComments,
  fetchCommentsStream,
  setCommentsStream
} from '../actions/actions'
// Prepare Blob support
uriToBlob = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function() {
      // return the blob
      resolve(xhr.response)
    }

    xhr.onerror = function() {
      // something went wrong
      reject(new Error('uriToBlob failed'))
    }
    // this helps us get a blob
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)

    xhr.send(null)
  })
}

const getAuthors = uid =>
  dataBaseService
    .ref(`users/${uid}`)
    .once('value')
    .then(resp => resp)

uploadToFirebase = (blob, userId, dir) => {
  return new Promise((resolve, reject) => {
    var storageRef = storageService.ref()
    let urlToUpload = `users/${userId}/${dir}/${blob._data.name}`
    console.log(urlToUpload)
    storageRef
      .child(urlToUpload)
      .put(blob, {
        contentType: 'image/jpeg'
      })
      .then(async snapshot => {
        blob.close()
        urlImg = await snapshot.ref.getDownloadURL().then(url => url)
        console.log(urlImg)
        resolve(urlImg)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const handleRegister = async data => {
  const response = await authService.createUserWithEmailAndPassword(
    data.values.email,
    data.values.password
  )
  const resp = response.user
  let avatar = await uriToBlob(data.avatar)
  let genAvatar = uploadToFirebase(avatar, resp.uid, 'uploads').then(url => url)
  return { user: resp, avatar: await genAvatar }
}

const saveUser = async ({ username, email, avatar, uid }) => {
  dataBaseService.ref(`users/${uid}`).set({
    name: username,
    email,
    avatar
  })
}

const handleLogin = async ({ email, password }) => {
  const succcess = await authService.signInWithEmailAndPassword(email, password)
  return succcess
}

const handleTimeline = () =>
  dataBaseService
    .ref('posts/')
    .once('value')
    .then(snapshot => {
      let timeline = []
      snapshot.forEach(post => {
        const { key } = post
        const posted = post.val()
        posted.key = key
        timeline.push(posted)
      })
      // console.log('timeline', timeline)
      return timeline
    })

const handleCommentsStream = posts =>
  dataBaseService
    .ref(`/posts/${posts.postId}/comments/`)
    .once('value')
    .then(snapshot => {
      const streamList = []
      console.log('steramed')
      snapshot.forEach(post => {
        const { id } = post
        const comment = post.message
        comment.id = id
        streamList.push(posted)
      })
      console.log('saga stream', streamList)
      // return snapshot
    })

const handlePost = async data => {
  // upload the image
  const { post } = data
  let snap = await uriToBlob(post.imgUrl)
  let imgPost = await uploadToFirebase(snap, post.userID, 'uploads/posts').then(
    url => url
  )
  // save it into  the database
  dataBaseService
    .ref(`posts/`)
    .push({
      userId: post.userID,
      post: post.postDesc,
      image: imgPost
    })
    .then(response => {
      console.log('posted in:', response)
    })
}

const handleLike = data => {
  console.log(data)
  const { payload } = data
  const likeObj = { [payload.userId]: payload.like }
  // console.log('data', likeObj)

  dataBaseService
    .ref(`posts/${payload.postId}/likes`)
    .update(likeObj)
    .then(response => {
      console.log('firebase says:', response)
    })
}

const handleComments = async data => {
  const { message, postId, user, id, date } = data.payload
  console.log('from saga', user)
  await dataBaseService
    .ref(`posts/${postId}/comments/${id}`)
    .set({ id, message, user, date })
    .then(res => console.log('commented!'))
}

// sagas
function* registerService(data) {
  try {
    console.log('init:')

    const register = yield call(handleRegister, data.payload)
    // console.log(register)
    const {
      user: { uid, email },
      avatar
    } = register
    const {
      values: { username }
    } = data.payload
    yield call(saveUser, { uid, email, username, avatar })
    console.log('end')
  } catch (error) {
    console.log('error: ', error)
  }
}

function* loginService(values) {
  try {
    console.log('init')
    const logged = yield call(handleLogin, values.payload)
  } catch (error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.')
    } else {
      alert(errorMessage)
    }
    console.log(error)
  }
}

function* createPostService(data) {
  try {
    console.log('saving post init')
    const post = yield call(handlePost, data)
    console.log('end')
  } catch (error) {
    alert(error)
  }
}

function* getTimelineService() {
  try {
    yield put(fetchTimeline(true))
    const postsTimeline = yield call(handleTimeline)
    // console.log(postsTimeline)
    const authors = yield all(
      postsTimeline.map(post => call(getAuthors, post.userId))
    )
    yield put(setTimeline(postsTimeline.reverse()))
    yield put(setAuthors(authors.reverse()))
    yield put(fetchTimeline(false))
    console.log('fetched')
  } catch (error) {
    alert(error)
  }
}

function* getStreamComments(data) {
  try {
    // console.log('fetching-comments')
    yield put(fetchTimeline(true))
    const commentStream = yield call(handleCommentsStream(data))
    console.log('hago un llamado', commentStream)
    yield put(setCommentsStream(commentStream))
    yield put(fetchTimeline(false))
    console.log('comments fetch done!')
  } catch (error) {}
}

function* likeService(data) {
  try {
    yield put(setLike(handleLike(data)))
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

function* commentsService(data) {
  try {
    yield put(setComments(handleComments(data)))
  } catch (error) {
    console.log(error)
  }
}

export function* defaultSaga(values) {
  // yield
  yield takeEvery(REGISTER, registerService)
  yield takeEvery(LOGIN, loginService)
  yield takeEvery(CREATE_POST, createPostService)
  yield takeEvery(GET_POSTS, getTimelineService)
  yield takeEvery(SET_LIKE, likeService)
  yield takeEvery(SET_COMMENTS, commentsService)
  yield takeEvery(GET_COMMENTS, getStreamComments)

  console.log('saganding')
}
