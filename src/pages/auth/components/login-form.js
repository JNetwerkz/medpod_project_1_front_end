import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const LoginForm = (props) => (
    <Form onSubmit={(event) => props.handleSubmit(event)}>
        <Form.Field>
          <label>Email</label>
          <input type='email' name='email' placeholder='bestemployee@mail.com' value={props.email} onChange={(event) => props.handleChange('email', event)} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' name='password' placeholder='password' value={props.password} onChange={(event) => props.handleChange('password', event)} />
        </Form.Field>
        <Form.Field>
          <label>&nbsp;</label>
          <Button primary fluid type='submit'>Sign in</Button>
        </Form.Field>
    </Form>
)

export default LoginForm
