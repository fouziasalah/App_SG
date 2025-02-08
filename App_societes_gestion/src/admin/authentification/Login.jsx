import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await authService.login(email, password);
      setSuccessMessage('Connexion réussie');
      setErrorMessage(''); 
      localStorage.setItem('authToken', result.token);
      navigate('/admin');
    } catch (error) {
      setErrorMessage('Identifiants incorrects ou problème serveur');
      setSuccessMessage(''); 
    }
  };
  return (
  <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Connexion</h2>
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

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">Se connecter</button>
        </div>
      </form>

      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      {successMessage && <p className="text-success mt-3">{successMessage}</p>}
    </div>
  </div>
);
};

export default Login;
