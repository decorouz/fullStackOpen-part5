import React from 'react'

const Form = (props) => {
  const loginFormContainer = () => (
    <form onSubmit={props.handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={props.username}
          name="Username"
          onChange={props.changeHandler}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          name="Password"
          onChange={props.passChangeHandler}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <h1>Login into the application</h1>
      {loginFormContainer()}
    </div>
  )
}

export default Form
