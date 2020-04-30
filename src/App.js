import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [newTitle, setNewTitle] = useState('')
  // const [author, setNewAuthor] = useState('')
  // const [url, seturl] = useState('')
  const [form, setState] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [notificationType, setNotificationType] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedBloglistappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const changeHandler = (event) => {
    setUsername(event.target.value)
  }

  const passChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const updateAddBlogField = (event) => {
    setState({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const { title, author, url } = form

    const blogObject = {
      title,
      author,
      url,
    }

    const savedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(savedBlog))

    setNotification(`a new blog ${blogObject.title} by ${blogObject.author}`)
    setNotificationType('successful')
    setTimeout(() => {
      setNotification(null)
    }, 5000)

    setState({ ...form, title: '', author: '', url: '' })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('LoggedBloglistappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)

      setNotification(`${user.name}, You've successfully logged in`)
      setNotificationType('successful')

      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification(`Wrong username or password`)
      setNotificationType('unsuccessful')

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('LoggedBloglistappUser')

    setNotification(`You've successfully logout`)
    setNotificationType('successful')
    setTimeout(() => {
      setNotification(null)
    }, 5000)

    setUser(null)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={form.title}
          name="title"
          onChange={updateAddBlogField}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={form.author}
          name="author"
          onChange={updateAddBlogField}
        />
      </div>
      <div>
        url:
        <input
          type="url"
          value={form.url}
          name="url"
          onChange={updateAddBlogField}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
  return (
    <div>
      {user === null ? (
        <div>
          <Notification message={notification} type={notificationType} />
          <Form
            handleLogin={handleLogin}
            username={username}
            changeHandler={changeHandler}
            password={password}
            passChangeHandler={passChangeHandler}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={notification} type={notificationType} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>Create new</h2>
          {blogForm()}

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
