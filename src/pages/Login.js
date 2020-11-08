import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Login.css'
import { Form, Button} from 'react-bootstrap';

function Login({user, setUser}) {

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {

    console.log(data);
    try {
      const response = await axios.post('http://localhost:4000/login', {
          email: data.email,
          password: data.password
      });
      if (response.status ===200) {
        setUser({
          userid: response.data.idusers,
          email: data.email,
          surname: response.data.surname,
          lastname: response.data.lastname,
          achievements: response.data.achievments,
          total_score: response.data.total_score,
          nocc: response.data.nocc
        });
      }
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
    
  }

  return (
    <div className="LoginContainer">
      {/*}
      <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
        <input 
          name="email"
          type="text"
          ref={register({
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid Email Adress'
            }
          })}
        />
        {errors.email && errors.email.message}
        <input name="password" type="password" ref={register()} />
        <button type="submit"> Login </button>
      </form>
      <p>{user.email}</p>
      */}
      <span className="b">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="text" placeholder="Enter email" ref={register({
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid Email Adress'
            }
          })} />
          {errors.email && errors.email.message}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" ref={register()} />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Login
        </Button>
      </Form>
      </span>
    </div>
  );
}

export default Login;