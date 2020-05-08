import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('blog default render', () => {
  const blog = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('Ego is the enemy')
  expect(component.container).toHaveTextContent('Ryan Holiday')

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Ego is the enemy')
  expect(div).toHaveTextContent('Ryan Holiday')
})
