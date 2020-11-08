import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Register.css';
import { Form, Button } from 'react-bootstrap';

function Register({setUser}) {

  const { watch, register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:4000/register', {
        email: data.email,
        password: data.password,
        surname: data.surname,
        lastname: data.lastname,
        totalscore: 0,
        achivement: 0
      });
      if (response.status ===200) {
        setUser({
          userid: response.data.idusers,
          email: data.email,
          surname: data.surname,
          lastname: data.lastname
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
  <div className="RegisterContainer">
   {/*} <form className="RegisterForm" onSubmit={handleSubmit(onSubmit)}>
      <input name="surname" type="text" ref={register()} />
      <input name="lastname" type="text" ref={register()} />
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
      <input name="verifyPassword" type="password" ref={register({
          validate: value => value === watch("password") || "Passwords don't match" 
      })} />
      {errors.verifyPassword && errors.verifyPassword.message}
      <button type="submit"> Login </button>
    </form>
    */}
    
    <span class="b">
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formSurname">
        <Form.Label>Surname</Form.Label> 
        <Form.Control name="surname" type="text" placeholder="First name" ref={register()} />
      </Form.Group>
      <Form.Group controlId="formLastname">
        <Form.Label>Lastname</Form.Label> 
        <Form.Control name="lastname" type="text" placeholder="Last name" ref={register()} />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="text" placeholder="Enter email" ref={register({
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid Email Adress'
          }
        })} />
        {errors.email && errors.email.message}
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" ref={register({required: true})} />
      </Form.Group>
      <Form.Group controlId="formVerify">
        <Form.Label>Verify Password</Form.Label> 
        <Form.Control name="verifyPassword" type="password" ref={register({
          required: true,
          validate: value => value === watch("password") || "Passwords don't match" 
        })} />
        {errors.verifyPassword && errors.verifyPassword.message}
      </Form.Group>
      
      <Button type="submit">
        Register
      </Button>
    </Form>
    </span>
    
    
  </div>
  );
}

export default Register;