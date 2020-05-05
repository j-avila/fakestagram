import { takeEvery, call, put, all } from 'redux-saga/effects'
import {
  authService,
  dataBaseService,
  storageService
} from '../servicios/firebase'
import * as type from '../actions/types'
import {
  setTimeline,
  setAuthors,
  fetching,
  setLike,
  setComments,
  setCommentsStream,
  setUsers,
  setProfile
} from '../actions'
import { database } from 'firebase'

// parse the firebase obaject

const parseObj = obj => {
  let postRaw = JSON.stringify(obj)
  let postObj = JSON.parse(postRaw)
  return postObj
}

const objConverter = async (obj, keys) => {
  let result = []
  obj.forEach(o => {
    let raw = parseObj(o)
    let item = {
      ...raw
    }
    result.push(item)
  })
  return result
}

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
    id: uid,
    name: username,
    email,
    avatar
  })
}

const handleLogin = async ({ email, password }) => {
  const succcess = await authService.signInWithEmailAndPassword(email, password)
  return succcess
}

const getUsers = async id => {
  const users = await dataBaseService
    .ref(`/users/${id.length > 1 ? id : ''}`)
    .once('value')
  return users
}

const getPosts = userId =>
  dataBaseService
    .ref(`/posts/`)
    .orderByChild('userId')
    .equalTo(userId)
    .once('value')

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

const handleCommentsStream = async posts => {
  let obj = getUsers()
  const usersObj = await getUsers(obj)

  const usersList = () => {
    let usersOutput = []
    usersObj.forEach(u => {
      const uObj = parseObj(u)
      const { name, id, avatar } = uObj
      let user = {
        name,
        id,
        avatar
      }
      usersOutput.push(user)
    })
    return usersOutput
  }

  return await dataBaseService
    .ref(`/posts/${posts.postId}/comments/`)
    .once('value')
    .then(snapshot => {
      const streamList = []
      snapshot.forEach(post => {
        const arr = parseObj(post)
        const { id, date, user, message } = arr
        const pic = usersList().filter(u => u.id === user)[0]
        // console.log(pic)
        let comment = {
          id,
          date,
          user,
          avatar: pic.avatar,
          message,
          userName: pic.name
        }
        // console.log(comment)
        streamList.push(comment)
      })
      return streamList
    })
}

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
      getTimelineService()
      console.log('posted in:', response)
    })
}

const handleLike = data => {
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
  // console.log('from saga', user)
  await dataBaseService
    .ref(`posts/${postId}/comments/${id}`)
    .set({ id, message, user, date })
    .then(res => console.log('commented!'))
}

const handleUserProfile = async ({ id }) => {
  let user = await getUsers(id)
  let posts = await getPosts(id)
  let result = {
    user: await parseObj(user),
    posts: await objConverter(posts)
  }
  return result
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
    yield call(handlePost, data)
    yield getTimelineService()
    console.log('end')
  } catch (error) {
    alert(error)
  }
}

function* getTimelineService() {
  try {
    yield put(fetching(true))
    const postsTimeline = yield call(handleTimeline)
    const authors = yield all(
      postsTimeline.map(post => call(getAuthors, post.userId))
    )
    yield put(setTimeline(postsTimeline.reverse()))
    yield put(setAuthors(authors.reverse()))
    yield put(fetching(false))
    console.log('fetched')
  } catch (error) {
    alert(error)
  }
}

function* getStreamComments(data) {
  try {
    // console.log('fetching-comments')
    yield put(fetching(true))
    const commentStream = yield call(handleCommentsStream, data)
    yield put(setCommentsStream(commentStream))
    yield put(fetching(false))
    console.log('comments fetch done!')
  } catch (error) {}
}

function* likeService(data) {
  try {
    yield put(fetching(true))
    yield handleLike(data)
    yield put(fetching(false))
    yield getTimelineService()
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

function* usersService(data) {
  try {
    yield put(setUsers(getUsers()))
  } catch (error) {
    console.log(error)
  }
}

function* userProfileHandler(id) {
  try {
    const profile = yield call(handleUserProfile, id)
    yield put(setProfile(profile))
  } catch (error) {
    console.log(error)
  }
}

export function* defaultSaga(values) {
  // yield
  yield takeEvery(type.REGISTER, registerService)
  yield takeEvery(type.LOGIN, loginService)
  yield takeEvery(type.CREATE_POST, createPostService)
  yield takeEvery(type.GET_POSTS, getTimelineService)
  yield takeEvery(type.SET_LIKE, likeService)
  yield takeEvery(type.SET_COMMENTS, commentsService)
  yield takeEvery(type.GET_COMMENTS, getStreamComments)
  yield takeEvery(type.GET_USERS, usersService)
  yield takeEvery(type.GET_PROFILE, userProfileHandler)
  console.log('saganding')
}
