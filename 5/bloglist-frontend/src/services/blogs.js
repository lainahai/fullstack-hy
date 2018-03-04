import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const tokenString = (token) => `bearer ${token}`

const create = async (newBlog, token) => {
  const config = {
    headers: {'Authorization': tokenString(token)}
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data

}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog._id}`, blog)
  return response.data
}

export default { getAll, create, update}