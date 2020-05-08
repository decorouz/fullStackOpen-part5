import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

test('<BlogForm /> form calls the event handler it received as props with the right details when a new blog is called.', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'Ego is the enemy' },
  })

  fireEvent.change(author, {
    target: { value: 'Ryan Holiday' },
  })

  fireEvent.change(url, {
    target: { value: 'https://ryanholiday.net/about/' },
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Ego is the enemy')
  expect(createBlog.mock.calls[0][0].author).toBe('Ryan Holiday')
  expect(createBlog.mock.calls[0][0].url).toBe('https://ryanholiday.net/about/')
})
