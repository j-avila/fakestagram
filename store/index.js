import {createStore, combineReducers} from 'redux'
import {reducer as form} from 'redux-form'		

const defaultReducer = (state=[0], action) => {
	switch (action.type) {
		case 'AUMENTAR':
			return [...state, 1]
	
		default:
			return state
	}
}

const login = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return state
		default:
			return state
	}
}
 
const reducers = combineReducers({
	defaultReducer,
	form
})


// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducers)

export default store
