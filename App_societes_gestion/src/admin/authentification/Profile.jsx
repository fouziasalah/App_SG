import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';
// import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await authService.getProfile();
        setUser(profileData.user);
      } catch (error) {
        setErrorMessage(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profil</h2>
      {errorMessage ? (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      ) : (
        user && (
          <div>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
