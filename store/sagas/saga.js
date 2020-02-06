import { takeEvery, call, putResolve } from 'redux-saga/effects'
import {
  authService,
  dataBaseService,
  storageService
} from '../servicios/firebase'

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

uploadToFirebase = (blob, userId, dir) => {
  return new Promise((resolve, reject) => {
    var storageRef = storageService.ref()
    storageRef
      .child(`users/${userId}/${dir}/${blob._data.name}`)
      .put(blob, {
        contentType: 'image/jpeg'
      })
      .then(async snapshot => {
        blob.close()
        urlImg = await snapshot.ref.getDownloadURL().then(url => url)
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
  let genAvatar = uploadToFirebase(avatar, resp.uid, 'uploads').then(url => url) // setear el userId no se de donde
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

const handlePost = async data => {
  // upload the image
  console.log('handlePost: ', data)
  let snap = await uriToBlob(data.imgUrl)
  let imgPost = uploadToFirebase(snap, resp.uid, 'uploads/posts').then(
    url => url
  ) // setear id tambien?
  // save it into  the database
  dataBaseService
    .ref(`users/posts/`)
    .put({
      post: data.post,
      image: imgPost
    })
    .then(response => {
      console.log('resp.', response)
    })
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
    console.log('end: ', post)
  } catch (error) {
    alert(error)
  }
}

export function* defaultSaga(values) {
  // yield
  yield takeEvery('REGISTER', registerService)
  yield takeEvery('LOGIN', loginService)
  yield takeEvery('CREATE_POST', createPostService)
  console.log('saganding')
}
