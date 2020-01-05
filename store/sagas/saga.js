import {takeEvery, call} from 'redux-saga/effects'
import {authService, dataBaseService} from '../servicios/firebase'

const handleRegister = data => {
	authService.createUserWithEmailAndPassword(data.email, data.password)
	.then( response => {
		const resp = response.user.toJSON()
		console.log(resp)
		return resp
	})
}

const saveUser = () => {
	dataBaseService.ref('users/' + userId).set({
		username: name,
		email: email,
		profile_picture : imageUrl
	});
}

const testPromise = new Promise((resolve, reject) => {
	setTimeout(function(){
    resolve("¡Éxito!"); // ¡Todo salió bien!
  }, 50000);
}) 

const testFunction = () => {
	testPromise.then( (success) => {
		return console.log("lo hizo?" + success)
	})
}

function* registerService(values) {
	try {
		console.log("init")
		const register =  yield call(testFunction)
		console.log(register)
		// console.log(values)
		// const {userid, email} = register
		// const {name:{name}} = values 
		// yield call(saveUser, {uid, email, name})
	} catch (error) {
		console.log("error: ",error)		
	}
} 

export function* defaultSaga(values) {
	// yield 
	yield takeEvery('REGISTER', registerService)
	console.log('saganding')
}