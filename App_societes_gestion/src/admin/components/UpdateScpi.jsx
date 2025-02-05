import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateScpi = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nomscpi: '',
    typescpi: '',
    categoriecpi: '',
    capitalisation: '',
    date_creation: '',
    idSocieteGest: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchScpi = async () => {
      try {
        console.log('Fetching SCPI with ID:', id);
        if (!id) {
          alert('ID SCPI manquant');
          return;
        }
  
        const response = await fetch(`http://localhost:5000/GetScpi/${id}`);
        const data = await response.json();
  
        console.log('SCPI data:', data); 
        if (data.error) {
          alert(data.error);
          return;
        }
  
        setFormData({
          nomscpi: data.nomscpi,
          typescpi: data.typescpi,
          categoriecpi: data.categoriecpi,
          capitalisation: data.capitalisation,
          date_creation: data.date_creation,
          idSocieteGest: data.idSocieteGest
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la SCPI:', error);
        alert('Une erreur est survenue lors du chargement de la SCPI.');
      }
    };
  
    fetchScpi();
  }, [id]);
  
   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/UpdateScpi/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        alert(`Erreur: ${errorResponse.error}`);
        return;
      }
  
      alert('SCPI mise à jour avec succès');
      navigate('/admin/scpis');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la SCPI:', error);
      alert('Une erreur est survenue, veuillez réessayer.');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Modifier la SCPI</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Nom de la SCPI</label>
          <input
            type="text"
            className="form-control"
            name="nomscpi"
            value={formData.nomscpi}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Type de SCPI</label>
          <input
            type="text"
            className="form-control"
            name="typescpi"
            value={formData.typescpi}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Catégorie</label>
          <input
            type="text"
            className="form-control"
            name="categoriecpi"
            value={formData.categoriecpi}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Capitalisation</label>
          <input
            type="number"
            className="form-control"
            name="capitalisation"
            value={formData.capitalisation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_creation">Date de création</label>
          <input
  type="date"
  className="form-control"
  id="date_creation"
  name="date_creation"
  value={formData.date_creation ? formData.date_creation.split('T')[0] : ''} 
  onChange={handleChange}  
  required
/>
        </div>
        <div className="form-group mb-3">
          <label>Societe de gestion</label>
          <input
            type="number"
            className="form-control"
            name="idSocieteGest"
            value={formData.idSocieteGest}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateScpi;
