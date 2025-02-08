import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    console.log("Register");
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // role pr défaut
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    try {
      const result = await authService.signup(email, password, role);
      setSuccessMessage(result.msg);
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      setErrorMessage(error);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Inscription</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Rôle</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          </div>
  
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success">S'inscrire</button>
          </div>
        </form>
  
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
      </div>
    </div>
  );
  
};

export default Signup;
