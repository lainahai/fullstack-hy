const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a new blog can be created', async () => {
  const testblog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(testblog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map((res) => res.title)

  expect(response.body.length).toBe(2)
  expect(titles).toContain('React patterns')
})

test('a blog can be deleted', async () => {
  let response = await api.get('/api/blogs')
  const testblog = response.body[0]
  
  const lengthBefore = response.body.length
  const deletedTitle = testblog.title

  await api.delete(`/api/blogs/${testblog._id}`)

  response = await api.get('/api/blogs')
  const titles = response.body.map((res) => res.title)

  expect(response.body.length).toBe(lengthBefore - 1)
  expect(titles).not.toContain(deletedTitle)

})

beforeAll(async () => {
  const newblog = new Blog({
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  })

  await Blog.remove({})

  await newblog.save()

})


afterAll(() => {
  server.close()
})
