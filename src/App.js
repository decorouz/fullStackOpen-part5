import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const addBlog = async (blogObject) => {
    const savedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(savedBlog))

    setNotification(`a new blog ${blogObject.title} by ${blogObject.author}`)
    setNotificationType('successful')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  return (
    <>
      {user === null ? (
        <div>
          <Notification message={notification} type={notificationType} />
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={notification} type={notificationType} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>Create new</h2>
          <BlogForm createBlog={addBlog} />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
