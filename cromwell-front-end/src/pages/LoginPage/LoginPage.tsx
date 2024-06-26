import './LoginPage.scss';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  apiUrl: string
}

interface LoginForm {
  email: string
  password: string
}

const LoginPage: React.FC<LoginPageProps> = ({ apiUrl }) => {
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState<LoginForm>({ email: "", password: "" })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await axios.post<{ token: string }>(`${apiUrl}/user/login`, {
        email: loginForm.email,
        password: loginForm.password
      });
      console.log(response)
      const data = response.data
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userEmail', loginForm.email)
        navigate("/landing")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setLoginForm({ ...loginForm, [name]: value })
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">Login</h2>

        <div className="login-form__field">
          <label className="login-form__label" htmlFor="email">Email Address</label>
          <input
            className="login-form__input"
            value={loginForm.email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label" htmlFor="password">Password</label>
          <input
            className="login-form__input"
            value={loginForm.password}
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <button className="login-form__button" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage