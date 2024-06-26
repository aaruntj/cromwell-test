import './RegistrationPage.scss';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

interface RegistrationPageProps {
  apiUrl: string
}

interface RegistrationForm {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ apiUrl }) => {
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (registrationForm.password === registrationForm.passwordConfirm) {
      try {
        const response: AxiosResponse = await axios.post(`${apiUrl}/user/register`, {
          name: registrationForm.name,
          email: registrationForm.email,
          password: registrationForm.password,
        });
        // Handle response if necessary
        console.log(response)
      } catch (error) {
        console.error('Error registering user:', error)
      }
    } else {
      alert('Passwords do not match')
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setRegistrationForm({ ...registrationForm, [name]: value })
  }

  return (
    <div className="registration-page">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2 className="registration-form__title">Register</h2>

        <div className="registration-form__field">
          <label className="registration-form__label" htmlFor="name">Name</label>
          <input
            className="registration-form__input"
            value={registrationForm.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>

        <div className="registration-form__field">
          <label className="registration-form__label" htmlFor="email">Email Address</label>
          <input
            className="registration-form__input"
            value={registrationForm.email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>

        <div className="registration-form__field">
          <label className="registration-form__label" htmlFor="password">Password</label>
          <input
            className="registration-form__input"
            value={registrationForm.password}
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <div className="registration-form__field">
          <label className="registration-form__label" htmlFor="confirm-password">Confirm Password</label>
          <input
            className="registration-form__input"
            value={registrationForm.passwordConfirm}
            onChange={handleChange}
            type="password"
            id="confirm-password"
            name="passwordConfirm"
            required
          />
        </div>

        <button className="registration-form__button" type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegistrationPage