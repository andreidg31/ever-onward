import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Login.css'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

function Login({user, setUser}) {

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {

    setUser({
      email: data.email,
      password: data.password
    });
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    try {
      const response = await axios.post('http://localhost:4000/login', user);
      
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
    
  }

  return (
    <div className="LoginContainer">
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
    </div>
  );
}

export default Login;