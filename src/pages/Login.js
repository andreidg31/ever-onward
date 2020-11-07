import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
function Login({user, setUser}) {

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setUser({
      email: data.email,
      password: data.password
    });
    
    axios.post('/login', user);
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
    </div>
  );
}

export default Login;