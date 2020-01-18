import {takeEvery, call} from 'redux-saga/effects'
import {authService, dataBaseService} from '../servicios/firebase'

const avatar = "https://ui-avatars.com/api/?name=John+Doe"

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
		const register =  yield call(handleRegister, values.payload)
		// console.log(register)
		console.log(values)
		const {uid, email} = register
		const {payload:{username}} = values
		yield call(saveUser, {uid, email, username, avatar})
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