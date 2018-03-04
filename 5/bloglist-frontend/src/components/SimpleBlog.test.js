import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Testiblogi',
      author: 'Harry',
      likes: 0
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={() => console.log('tyks')} />)
    const titleDiv = blogComponent.find('.titleDiv')

    const likesDiv = blogComponent.find('.likesDiv')

    expect(titleDiv.text()).toContain(blog.title)
    expect(titleDiv.text()).toContain(blog.author)

    expect(likesDiv.text()).toContain('blog has 0 likes')
  })
})