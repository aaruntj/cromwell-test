import './LandingPage.scss';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LandingPageProps {
  apiUrl: string
}

const LandingPage: React.FC<LandingPageProps> = ({ apiUrl }) => {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    if (!token || !userEmail) {
      navigate('/home')
    } else {
      async function getUserData() {
        try {
          console.log(userEmail)
          const response = await axios.get(`${apiUrl}/user`, {
            headers: {
              email: userEmail,
              token: token
            }
          });
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
      getUserData();
    }
  }, [navigate, token, userEmail, apiUrl])

  return (
    <div>
      <p>Hello there, {userEmail}</p>
    </div>
  );
}

export default LandingPage;