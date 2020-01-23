import { takeEvery, call, putResolve } from 'redux-saga/effects'
import { authService, dataBaseService, storageService } from '../servicios/firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { storage } from 'firebase'


// url ref: https://github.com/dailydrip/react-native-firebase-storage/blob/master/src/App.js#L43-L69

const setAvatar =(avatar, mime='application/octet-stream') => {
	const { uri, type } = avatar
	
	// Prepare Blob support
	return new Promise((resolve, reject) => {
		const Blob = RNFetchBlob.polyfill.Blob
		const fs = RNFetchBlob.fs
		window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
		window.Blob = Blob
		let imageRef = storageService.ref().child('users/avatar.jpg')
		const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
		let uploadBlob = null
	
		// procesing blob
		fs.readFile(uploadUri, 'base64')
			.then( data => {
				return Blob.build(data, {type: `${mime};BASE64` })
			})
			.them( blob => {
				uploadBlob = blob
				return imageRef.put(blob, {contentType: mime})
			})
			.then( () => {
				uploadBlob.close()
				return imageRef.getDownloadURL()
			})
			.then( url => {
				resolve(url)
			})
			.cath( error => {
				PromiseRejectionEvent(error)
			})
	})
}


const handleRegister = data => 
	authService.createUserWithEmailAndPassword(data.email, data.password)
	.then( response => response.user)

const saveUser = ({username, email, avatar, uid}) => {
	dataBaseService.ref(`users/${uid}`).set({
		name: username,
		email,
		avatar
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
		const avatarGen = yield call(setAvatar,  values.payload.avatar)
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