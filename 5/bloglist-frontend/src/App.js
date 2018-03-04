import React from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      newTitle: '',
      newUrl: '',
      newAuthor: '',
      error: null,
      message: null
    }
  }

  showMessage = (message) => {
    this.setState({message: message})
    setTimeout(() => {
      this.setState({message: null})      
    }, 5000)
  }

  showError = (message) => {
    this.setState({error: message})
    setTimeout(() => {
      this.setState({error: null})      
    }, 5000)
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      this.setState({
        username: '',
        password: '',
        user
      })
    } catch (exception) {
      this.showError('Invalid username or password')
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    this.setState({ user: null })
  }

  createBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create(
        {
          title: this.state.newTitle,
          author: this.state.newAuthor,
          url: this.state.newUrl
        },
        this.state.user.token
      )

      this.setState({
        blogs: this.state.blogs.concat([blog]),
        newAuthor: '',
        newTitle: '',
        newUrl: ''
      })
      this.showMessage(`Blog "${blog.title}" created`)
    } catch (exception) {
      this.showError('Error: missing required fields')
    }
  }


  addLike = async (blog, event) => {
    event.stopPopagation()
    try {
      const updatedBlog = await blogService.update(blog)
      console.log(updatedBlog)
      this.showMessage(`You liked ${updatedBlog.title}`)
    } catch (exception) {
      this.showError(exception)
    }
  }


  componentDidMount() {
    blogService.getAll().then((blogs) => this.setState({ blogs: blogs.sort((a, b) => b.likes - a.likes)}))

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      this.setState({ user: loggedUser })
    }
  }

  render() {
    const loginForm = () => {
      return (
        <div>
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleFieldChange}
            handleSubmit={this.login}
          />
        </div>
      )
    }

    const newBlogForm = () => {
      return (
        <Togglable buttonLabel='Add new blog'>
          <NewBlogForm
            title={this.state.newTitle}
            author={this.state.newAuthor}
            url={this.state.newUrl}
            handleChange={this.handleFieldChange}
            handleSubmit={this.createBlog}
          />
        </Togglable>
      )
    }

    const greeting = () => (
      <div>
        Logged in as {this.state.user.name}
        <button onClick={this.logout}>Log out</button>
      </div>
    )

    //{this.state.blogs.map((blog) => <Blog key={blog._id} blog={blog} handleLike={this.handleLike} />)}
    const blogList = () => (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
      </div>
    )

    return (
      <div>
        <Notification 
          errorMessage={this.state.error}
          message={this.state.message}
        />

        {this.state.user === null && loginForm()}

        {this.state.user !== null && greeting()}
        {this.state.user !== null && newBlogForm()}
        {this.state.user !== null && blogList()}
      </div>
    )
  }
}

export default App
