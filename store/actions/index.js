import {
  GET_POSTS,
  SET_TIMELINE,
  SET_AUTHORS,
  FETCHING,
  SET_LIKE,
  SET_COMMENTS,
  SET_COMMENTS_STREAM,
  GET_COMMENTS,
  GET_USERS,
  GET_PROFILE,
  SET_PROFILE,
  GET_CURRENT_PROFILE,
  SET_CURRENT_PROFILE,
  FETCH_EXPLORE_PICS,
  SET_EXPLORE_PICS
} from './types'

export const registerAction = (type, payload) => ({
  type,
  payload
})

export const loginAction = (type, payload) => ({
  type,
  payload
})

export const manageSession = (type, payload) => ({
  type,
  payload
})

export const setAvatar = (type, payload) => ({
  type,
  payload
})

export const setPostImg = (type, image) => ({
  type,
  image
})

export const setCreatePost = (type, post) => ({
  type,
  post
})

export const getPosts = () => ({
  type: GET_POSTS
})

export const setLike = data => ({
  type: SET_LIKE,
  payload: data
})

export const setTimeline = posts => ({
  type: SET_TIMELINE,
  timeline: posts
})

export const fetchCommentsStream = comment => ({
  type: GET_COMMENTS,
  postId: comment.postId
})

export const setCommentsStream = comments => ({
  type: SET_COMMENTS_STREAM,
  payload: comments
})

export const setAuthors = authors => ({
  type: SET_AUTHORS,
  authors: authors
})

export const fetching = loading => ({
  type: FETCHING,
  fetching: loading
})

export const setComments = comment => {
  return {
    type: comment.type,
    payload: comment.payload
  }
}

export const setUsers = users => ({
  type: GET_USERS,
  payload: users
})

export const getProfile = id => ({
  type: GET_PROFILE,
  id
})

export const getCurrentProfile = id => ({
  type: GET_CURRENT_PROFILE,
  id
})

export const setCurrentProfile = user => ({
  type: SET_CURRENT_PROFILE,
  user
})

export const setProfile = user => {
  return {
    type: SET_PROFILE,
    payload: user
  }
}

export const getExploreFeed = exploreFeed => ({
  type: FETCH_EXPLORE_PICS,
  exploreFeed
})

export const setExploreFeed = exploreFeed => ({
  type: SET_EXPLORE_PICS,
  payload: exploreFeed
})
