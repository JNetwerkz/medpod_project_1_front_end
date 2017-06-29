import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const LoginForm = (props) => (
  <Form onSubmit={(event) => props.handleSubmit(event)}>
    <Form.Field>
      <label>Email</label>
      <input type='email' name='email' placeholder='xxx@mail.com' value={props.email} onChange={(event) => props.handleChange('email', event)} />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type='password' name='password' placeholder='ilovepie' value={props.password} onChange={(event) => props.handleChange('password', event)} />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default LoginForm
