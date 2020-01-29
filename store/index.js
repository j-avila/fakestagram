import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {reducer as form} from 'redux-form'
import createSagaMiddleware from 'redux-saga'	
import {defaultSaga} from '../store/sagas/saga'
import * as type from "../store/actions/types";	

const defaultReducer = (state=[], action) => {
	switch (action.type) {
		case 'REGISTER':
			// console.log('from reducer',action.payload)
			return [...state, action.payload]
	
		default:
			return state
	}
}

const setAvatar = (state=null, action) => {
	switch(action.type) {
		case 'SET_AVATAR':
			// console.log('payload-reducer',action)
			return action.payload
		case 'DELETE_AVATAR':
			return action.payload
		default:
			return state
	}
}

const postImg = (state={image: null}, action) => {
	switch(action.type) {
		case 'SET_POST_PHOTO':
			// console.log('payload-reducer',actaction.imageion)
			return {image: action.image}
		case 'REMOVE_POST_PHOTO':
			return {image: null}
		default:
			return state
	}
}

const sessionHandler = (state=null, action) => {
	switch (action.type) {
		case type.USER_LOGGED:
			return action.payload
			break;
		case type.USER_NO_LOGGED:
			return null
		default:
			return state
			break;
	}
}

const reducers = combineReducers({
	defaultReducer,
	form,
	setAvatar,
	sessionHandler,
	postImg
})


const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(
	defaultSaga 
)

export default store