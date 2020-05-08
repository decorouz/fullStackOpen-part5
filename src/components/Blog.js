import React, { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, onUpdateBlogLikes, onDeleteBlog, loginUser }) => {
  const [visible, setVisible] = useState(true)

  const toggle = () => {
    setVisible(!visible)
  }

  const label = visible ? 'view' : 'hide'

  const { title, author, url, likes } = blog

  return (
    <div className="blogStyle">
      {visible ? (
        <div className="blog">
          {title} {author}
          <button onClick={toggle}>{label}</button>
        </div>
      ) : (
        <div>
          <div>
            {title} {author} <button onClick={toggle}>{label}</button>
          </div>
          <div>{url}</div>
          <span>likes: {likes} </span>
          <button onClick={() => onUpdateBlogLikes(blog.id)}>like</button>
          <div>Creator: {blog.user.name}</div>
          {blog.user.username === loginUser && (
            <button
              className="remove-btn"
              onClick={() => onDeleteBlog(blog.id)}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onUpdateBlogLikes: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
  loginUser: PropTypes.string.isRequired,
}

Blog.displayName = 'Blog'
export default Blog
