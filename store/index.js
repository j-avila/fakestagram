import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as form } from 'redux-form'
import createSagaMiddleware from 'redux-saga'
import { defaultSaga } from '../store/sagas'
import * as type from '../store/actions/types'
import { composeWithDevTools } from 'redux-devtools-extension'
import defaultHeader from '../components/shared/defaultHeader'

const defaultReducer = (state = [], action) => {
  switch (action.type) {
    case 'REGISTER':
      // console.log('from reducer',action.payload)
      return [...state, action.payload]

    default:
      return state
  }
}

const setAvatar = (state = null, action) => {
  switch (action.type) {
    case 'SET_AVATAR':
      // console.log('payload-reducer',action)
      return action.payload
    case 'DELETE_AVATAR':
      return action.payload
    default:
      return state
  }
}

const postImg = (state = { image: null }, action) => {
  switch (action.type) {
    case 'SET_POST_PHOTO':
      // console.log('payload-reducer', action.image)
      return { image: action.image }
    case 'REMOVE_POST_PHOTO':
      return { image: null }
    default:
      return state
  }
}

const createPost = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_POST':
      // console.log('in store: ', action.post)
      return action.post
    default:
      return state
  }
}

const sessionHandler = (state = null, action) => {
  switch (action.type) {
    case type.USER_LOGGED:
      return action.payload
    case type.USER_NO_LOGGED:
      return null
    default:
      return state
  }
}

const getPostsHandler = (state = [], action) => {
  switch (action.type) {
    case 'GET_POSTS':
    default:
      return state
  }
}

const setTimelineHandler = (state = [], action) => {
  // console.log('to store', action)
  switch (action.type) {
    case 'SET_TIMELINE':
      return action.timeline
    default:
      return state
  }
}

const setAuthorsHandler = (state = [], action) => {
  switch (action.type) {
    case 'SET_AUTHORS':
      return action.authors
    default:
      return state
  }
}

const isfetching = (state = [], action) => {
  switch (action.type) {
    case 'FETCHING':
      return action.fetching
    default:
      return state
  }
}

const commentsStream = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMMENTS_STREAM':
      return [...action.payload]
    default:
      return state
  }
}

const commentsHandler = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload
    default:
      return state
  }
}

const usersHandler = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.payload
    default:
      return state
  }
}

const currentUser = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_PROFILE':
      return action.user
    default:
      return state
  }
}

const setProfileData = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return action.payload
    default:
      return state
  }
}

const exploreFeed = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXPLORE_PICS':
      return action.payload
    default:
      return state
  }
}

const reducers = combineReducers({
  defaultReducer,
  form,
  setAvatar,
  sessionHandler,
  postImg,
  createPost,
  getPostsHandler,
  setTimelineHandler,
  setAuthorsHandler,
  isfetching,
  commentsHandler,
  commentsStream,
  usersHandler,
  setProfileData,
  currentUser,
  exploreFeed
})

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(defaultSaga)

export default store
