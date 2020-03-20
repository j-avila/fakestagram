import {
  GET_POSTS,
  SET_TIMELINE,
  SET_AUTHORS,
  FETCH_TIMELINE,
  SET_LIKE,
  SET_COMMENTS,
  SET_COMMENTS_STREAM,
  GET_COMMENTS,
  GET_USERS,
  GET_PROFILE
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

export const fetchTimeline = loading => ({
  type: FETCH_TIMELINE,
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

export const setProfile = user => ({
  type: GET_PROFILE,
  payload: user
})
