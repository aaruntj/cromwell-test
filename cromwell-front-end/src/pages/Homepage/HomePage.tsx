import './HomePage.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface LocationData {
  city: string
  region: string
  country_name: string
}

const HomePage: React.FC = () => {
  const [location, setLocation] = useState<string>('')

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await axios.get<LocationData>('https://ipapi.co/json/')
        const { city, region, country_name } = response.data
        setLocation(`${city}, ${region}, ${country_name}`)
      } catch (error) {
        console.error('Error fetching the location:', error)
      }
    }

    fetchLocation()
  }, [])

  return (
    <div className="home-page">
      <h1 className="home-page__welcome">Welcome to Our Website</h1>
      {location && <p className="home-page__location">You are connecting from {location}</p>}
      <div className="home-page__cards">
        <Link to="/landing">
          <div className="card">
            <h2 className="card__title">Landing Page</h2>
            <p className="card__description">You will automatically be redirected here if you are logged in. This link will not work if you are not.</p>
          </div>
        </Link>
        <Link to='/register'>
          <div className="card">
            <h2 className="card__title">Register</h2>
            <p className="card__description">Don't have an account with us? Create one Now!</p>
          </div>
        </Link>
        <Link to='/login'>
          <div className="card">
            <h2 className="card__title">Login</h2>
            <p className="card__description">Already have an account? Sign in here.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default HomePage