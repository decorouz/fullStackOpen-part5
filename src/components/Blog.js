import React, { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ blog, onUpdateBlogLikes, onDeleteBlog, loginUser }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggle = () => {
    setView(!view)
  }

  const label = view ? 'hide' : 'view'

  const showMoreView = () => (
    <div>
      <a target="_blank" rel="noopener noreferrer" href={blog.url}>
        {blog.url}
      </a>
      <br />
      <span>likes: </span>
      {blog.likes}
      <button onClick={() => onUpdateBlogLikes(blog.id)}>like</button>
      <br />
      Creator: {blog.user.name}
      {blog.user.username === loginUser && (
        <button className="remove-btn" onClick={() => onDeleteBlog(blog.id)}>
          remove
        </button>
      )}
    </div>
  )

  return (
    <div style={blogStyle} className="blog">
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={toggle}>{label}</button>
      </div>

      {view && showMoreView()}
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
