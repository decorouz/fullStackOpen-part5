import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

test('blog default render', () => {
  const blog = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    url: 'https://ryanholiday.net/about/',
    likes: 4,
  }

  const component = render(
    <Blog blog={blog} onUpdateBlogLikes={() => {}} onDeleteBlog={() => {}} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.author)
  expect(div).toHaveTextContent(blog.title)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent('likes:')
})

test('clicking the view button shows url and numbers of likes', () => {
  const blog = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    url: 'https://ryanholiday.net/about/',
    likes: 4,
    user: {
      username: 'petter',
      name: 'james',
    },
  }

  const loginUser = 'james'

  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      loginUser={loginUser}
      onUpdateBlogLikes={() => {}}
      onDeleteBlog={() => {}}
    />
  )

  const button = component.getByText('view')
  button.onclick = mockHandler
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(blog.likes)
})
