import React, { useState } from 'react'

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
        <div>
          {title} {author} <button onClick={toggle}>{label}</button>
        </div>
      ) : (
        <div>
          <div>
            {title} {author} <button onClick={toggle}>{label}</button>
          </div>
          <div>{url}</div>
          <div>
            likes: {likes} <button onClick={onUpdateBlogLikes}>like</button>
          </div>
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

export default Blog
