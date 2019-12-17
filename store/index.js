import {createStore, combineReducers} from 'redux'

const defaultReducer = (state=[0], action) => {
	switch (action.type) {
		case 'AUMENTAR':
			return [...state, 1]
	
		default:
			return state
	}
}

const reducers = combineReducers({
	defaultReducer
})

const store = createStore(reducers)

export default store
