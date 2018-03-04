import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.blog = props.blog
    this.state = {
      visible: false,
      likes: this.blog.likes
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  addLike = (event) => {
    event.stopPropagation()
    const newLikes = this.state.likes + 1
    this.setState({likes: newLikes})

  }


  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      marginBottom: 5,
      background: '#F9F9F9'
    }

    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div style={blogStyle} onClick={this.toggleVisibility}>
        {this.blog.title} {this.blog.author}
        <div style={showWhenVisible}>
          <table>
            <tbody>
              <tr>
                <td>Id: </td>
                <td>{this.blog._id}</td>
              </tr>
              <tr>
                <td>URL</td>
                <td>
                  <a href={this.blog.url}>
                    {this.blog.url}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Likes</td>
                <td>{this.state.likes}</td>
                <td><button onClick={this.addLike}>Like</button></td>
              </tr>
              <tr>
                <td>Added by </td>
                <td>{this.blog.user.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}


export default Blog
