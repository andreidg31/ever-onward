import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function SignUp() {

  const { watch, register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    
    
  }

  return (
  <div className="SignUpContainer">
    <form className="SignUpForm" onSubmit={handleSubmit(onSubmit)}>
      <input name="firstname" type="text" ref={register()} />
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
  </div>
  );
}

export default SignUp;