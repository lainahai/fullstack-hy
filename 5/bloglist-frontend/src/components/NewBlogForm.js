import React from 'react'

const NewBlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Title: 
          <input
            value={title}
            onChange={handleChange}
            name="newTitle"
          />
        </div>
        <div>
          Author: 
          <input
            name="newAuthor"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          Url: 
          <input
            name="newUrl"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm