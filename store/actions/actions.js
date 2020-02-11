import { GET_POSTS } from './types'

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
