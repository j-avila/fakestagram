import * as firebase from 'firebase'

var firebaseConfig = {
	apiKey: "AIzaSyCtBM26PHxToercVzNOOgAHUS5hcko-vuE",
	authDomain: "fakestagram-93104.firebaseapp.com",
	databaseURL: "https://fakestagram-93104.firebaseio.com",
	projectId: "fakestagram-93104",
	storageBucket: "fakestagram-93104.appspot.com",
	messagingSenderId: "682303081209",
	appId: "1:682303081209:web:fb55ab7eb196afc4373028",
	measurementId: "G-4EW80TYZMF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth() 
export const dataBaseService = firebase.database() 
export const storageService = firebase.storage();