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
			return action.payload
		case 'DELETE_AVATAR':
			return action.payload
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
	sessionHandler
})


const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(
	defaultSaga 
)

export default store