import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {reducer as form} from 'redux-form'
import createSagaMiddleware from 'redux-saga'	
import {defaultSaga} from '../store/sagas/saga'	

const defaultReducer = (state=[0], action) => {
	switch (action.type) {
		case 'AUMENTAR':
			return [...state, 1]
		case 'REGISTER':
			// console.log('from reducer',action.payload)
			return [...state, action.payload]
	
		default:
			return state
	}
}

const reducers = combineReducers({
	defaultReducer,
	form
})


const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(
	defaultSaga 
)

export default store