import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationType, setNotificationType] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedBloglistappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('LoggedBloglistappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotification(`${exception.response.data.error}`)
      setNotificationType('unsuccessful')

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('LoggedBloglistappUser')

    setNotification(`You've successfully logout `)
    setNotificationType('successful')
    setTimeout(() => {
      setNotification(null)
    }, 1000)

    setUser(null)
  }

  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      getBlogs()

      setNotification(`A new blog by ${user.username} was added`)
      setNotificationType('successful')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification(`${exception.response.data.error}`)
      setNotificationType('unsuccessful')

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    const updateObject = { ...blog, likes: blog.likes + 1 }

    try {
      const result = await blogService.update(id, updateObject)

      setBlogs(blogs.map((blog) => (blog.id === result.id ? result : blog)))
    } catch (exception) {
      setNotification(`${exception.response.data.error}`)
    }
  }

  const handleDeleteBlog = async (id) => {
    if (
      window.confirm(
        `Remove blog. You're not going to need it! by ${user.name}`
      )
    ) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((b) => b.id !== id))
      } catch (exception) {
        setNotification(`${exception.response.data.error}`)
      }
    }
  }
  const blogFormRef = React.createRef()

  return (
    <>
      <Notification message={notification} type={notificationType} />

      {!user ? (
        <LoginForm handleSubmit={handleLogin} />
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name}, you're logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateNewBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                onUpdateBlogLikes={handleUpdateBlog}
                onDeleteBlog={handleDeleteBlog}
                loginUser={user.username}
              />
            ))}
        </>
      )}
    </>
  )
}

export default App
