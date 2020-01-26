import { takeEvery, call, putResolve } from 'redux-saga/effects'
import { authService, dataBaseService, storageService } from '../servicios/firebase'

 // Prepare Blob support
 uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
			// return the blob
      resolve(xhr.response);
    };
    
    xhr.onerror = function() {
      // something went wrong
      reject(new Error('uriToBlob failed'));
    };
    // this helps us get a blob
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    
    xhr.send(null);
  });
}

uploadToFirebase = (blob, userId) => {
	return new Promise((resolve, reject)=>{
		var storageRef = storageService.ref();
		storageRef.child(`users/${userId}/uploads/${blob._data.name}`).put(blob, {
			contentType: 'image/jpeg'
		}).then((snapshot)=>{
			blob.close();
			console.log('imgUrl', snapshot.ref.getDownloadURL)
			resolve(snapshot);
		}).catch((error)=>{
			reject(error);
		});
	});
} 

const handleRegister = data => {
	return authService.createUserWithEmailAndPassword(data.values.email, data.values.password)
	.then( response => {
		return response.user
	})
	.then( async resp => { 
		let avatar = await uriToBlob(data.avatar)
		return {user: resp ,image: uploadToFirebase(avatar, resp.uid)}
	})
}

const saveUser = async ({username, email, avatar, uid}) => {
	dataBaseService.ref(`users/${uid}`).set({
		name: username,
		email,
	});
}

handleLogin = ({email, password}) => {
	return authService.signInWithEmailAndPassword(email, password)
	.then(succcess => succcess)
}

function* registerService(data) {
	try {
		console.log('init:')

		const register =  yield call(handleRegister, data.payload)
		const {uid, email} = register.user
		const {values:{username, avatar}} = data.payload
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
		// console.log(logged)
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