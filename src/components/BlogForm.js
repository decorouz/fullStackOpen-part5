import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, seturl] = useState('')
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
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={form.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={form.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
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

export default BlogForm
