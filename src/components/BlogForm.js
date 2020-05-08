import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [form, setState] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChange = (event) => {
    setState({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const addBlog = (event) => {
    event.preventDefault()

    const { title, author, url } = form

    createBlog({
      title,
      author,
      url,
    })

    setState({ ...form, title: '', author: '', url: '' })
  }

  return (
    <div className="formDiv">
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={form.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={form.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="url"
            value={form.url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

BlogForm.displayName = 'BlogForm'

export default BlogForm
