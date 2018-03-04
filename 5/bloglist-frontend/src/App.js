import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
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

    }
  }

  handleLoginFieldChange = (event) => {
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
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      console.log('Error: Login failed for some reason...')
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    this.setState({user: null})
  }

  componentDidMount() {
    blogService.getAll().then((blogs) => this.setState({ blogs }))

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      this.setState({user: loggedUser})
    }
  }

  render() {

    const loginForm = () => {
      return (
        <div>
            <LoginForm
              visible={this.state.visible}
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
        </div>
      )
    }

    const greeting = () => (
      <div>
        Logged in as {this.state.user.name}
        <button onClick={this.logout}>Log out</button>
      </div>
    )

    const blogList = () => (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
      </div>
    )

    return (
      <div>
        {this.state.user === null && loginForm()}

        {this.state.user !== null && greeting()}
        {this.state.user !== null && blogList()}
        
      </div>
    )
  }

}

export default App
