import {
  GET_POSTS,
  SET_TIMELINE,
  SET_AUTHORS,
  FETCH_TIMELINE,
  SET_LIKE,
  SET_COMMENTS
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

export const setAuthors = authors => ({
  type: SET_AUTHORS,
  authors: authors
})

export const fetchTimeline = loading => ({
  type: FETCH_TIMELINE,
  fetching: loading
})

export const setComments = comments => {
  console.log('actions: ')
  return {
    type: SET_COMMENTS,
    payload: comments
  }
}
