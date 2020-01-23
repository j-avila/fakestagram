import { takeEvery, call } from 'redux-saga/effects'
import { authService, dataBaseService, storageService } from '../servicios/firebase'
import { storage } from 'firebase'

// const avatar = "https://ui-avatars.com/api/?name=John+Doe"

const setAvatar = avatar => {
	const { uri, type } = avatar
	let imgRef = storageService.ref()
	let imageObj = imgRef.child('users/avatar.jpg')

	const splitName = avatar.split('/')
	const name = [...splitName].pop()

	const metadata = {
		contentType: 'image/jpeg',
	}
	console.log('file sended: ', name)
	const uploadTask = imageObj.put(name, metadata)

	uploadTask.then( snapshot => {
		console.log('uploadded avatar')
		return snapshot
	}), error => {
		console.log(error)
	}
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