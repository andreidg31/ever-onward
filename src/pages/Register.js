import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Register.css';

function Register({setUser}) {

  const { watch, register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    
    try {
      const res = await axios.post('http://localhost:4000/register', {
        email: data.email,
        password: data.password,
        surname: data.surname,
        lastname: data.lastname,
        totalscore: 0,
        achivement: 0
      });
      setUser({
        email: data.email,
        password: data.password
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
  <div className="RegisterContainer">
    <form className="RegisterForm" onSubmit={handleSubmit(onSubmit)}>
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
  </div>
  );
}

export default Register;