import {takeEvery, call} from 'redux-saga/effects'
import {authService, dataBaseService} from '../servicios/firebase'

const handleRegister = data => 
	authService.createUserWithEmailAndPassword(data.email, data.password)
	.then( response => response.user)


// const saveUser = () => {
// 	dataBaseService.ref('users/' + userId).set({
// 		username: name,
// 		email: email,
// 		profile_picture : imageUrl
// 	});
// }

function* registerService(values) {
	try {
		console.log('init') 
		const register =  yield call(handleRegister, values.payload)
		console.log(register)
		// console.log(values)
		// const {userid, email} = register
		// const {name:{name}} = values
		// yield call(saveUser, {uid, email, name})
		console.log('end')
	} catch (error) {
		console.log("error: ",error)		
	} 
}

export function* defaultSaga(values) {
	// yield 
	yield takeEvery('REGISTER', registerService)
	console.log('saganding')
}