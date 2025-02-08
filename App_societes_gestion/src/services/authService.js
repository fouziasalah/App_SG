import axios from 'axios';
const API_URL = 'http://localhost:5000'; 

const authService = {

  // Inscription d'un utilisateur + Admin 
  signup: async (email, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, role });
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Erreur lors de l’inscription';
    }
  },

  // Connexion + génération de token JWT)
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token); 
          }
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Erreur de connexion';
    }
  },

  // authentification avec JWT
  getProfile: async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Aucun token trouvé');

      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Erreur lors de la récupération du profil';
    }
  },

  // Accéder à pannel admin (si l'utilisateur est un admin)
  getAdminPage: async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Aucun token trouvé');

      const response = await axios.get(`${API_URL}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.msg || 'Erreur d\'accès à la page admin';
    }
  },

  // Déconnexion 
  logout: () => {
    localStorage.removeItem('authToken');
  },
};

export default authService;
