import React, { useState } from 'react'

const Blog = ({ blog, handleLikes }) => {
  const [visible, setVisible] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggle = () => {
    setVisible(!visible)
  }

  const label = visible ? 'view' : 'hide'

  const { title, author, url, likes } = blog
  return (
    <div style={blogStyle}>
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
            likes: {likes} <button onClick={handleLikes}>like</button>
          </div>
          {blog.user.name}
        </div>
      )}
    </div>
  )
}

export default Blog
