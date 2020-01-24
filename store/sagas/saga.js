import { takeEvery, call, putResolve } from 'redux-saga/effects'
import { authService, dataBaseService, storageService } from '../servicios/firebase'


// url ref: https://github.com/dailydrip/react-native-firebase-storage/blob/master/src/App.js#L43-L69

/* const setAvatar = (avatar) => {
	const { uri, type } = avatar
	
	// Prepare Blob support
	// let imageRef = storageService.ref().child('users/avatar.jpg')
	const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
	let file = RNFetchBlob.wrap(uploadUri)
	const uploadImg = imageRef.put(blob, {contentType: mime})

	// procesing blob
	RNFetchBlob.fetch(uploadImg, file)
	.then( resp => {
		console.log(resp.text())
	})
	.cath( error => {
		console.log(error)
	})
}
 */



 // Prepare Blob support
const setAvatar = uri => {
	return new Promise( (resolve, reject) => {
		const xhr = new XMLHttpRequest()

		xhr.onload = () => {
			resolve(xhr.response)
		}
		xhr.onerror = () => {
			reject(new Error('uriToBlobFailed'))
		}

		xhr.responseType = 'blob'
		xhr.open('GET', uri, true)
		xhr.send(null)
	})
}


const uploadToFirebase = (blob) => {
  return new Promise((resolve, reject) => {
    var storageRef = storageService.ref();
    storageRef.child('users/photo.jpg').put(blob, {
      contentType: 'image/jpeg'
    }).then((snapshot)=>{
      blob.close();
      resolve(snapshot);
    }).catch((error)=>{
      reject(error);
    });
  });
}

const handleRegister = data => {
	console.log('usertoregister: ', data)

	return authService.createUserWithEmailAndPassword(data.email, data.password)
				.then( response => {
					return response.user
				})
				.then( blob => 
					uploadToFirebase(blob)
				)
}

const saveUser = async ({username, email, avatar, uid}) => {
	dataBaseService.ref(`users/${uid}`).set({
		name: username,
		email,
	});
}

handleLogin = ({email, password}) => {
	// console.log(email, password)
	return authService.signInWithEmailAndPassword(email, password)
	.then(succcess => succcess)
}

function* registerService(values) {
	try {
		console.log('init') 

		const register =  yield call(handleRegister, values.payload.values)
		const avatarGen = yield call(uploadToFirebase, setAvatar(values.payload.avatar))
		// console.log(values)
		console.log('avatar: ', avatarGen)
		const {uid, email} = register
		const {payload:{username, avatar}} = values
		yield call(saveUser, {uid, email, username})

		console.log('end')
	} catch (error) {
		console.log("error: ",error)		
	} 
}

function* loginService(values) {
	try {
		console.log('init')
		const logged = yield call(handleLogin, values.payload)
		console.log(logged)
	} catch (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
	}
}

export function* defaultSaga(values) {
	// yield 
	yield takeEvery('REGISTER', registerService)
	yield takeEvery('LOGIN', loginService)
	console.log('saganding')
}