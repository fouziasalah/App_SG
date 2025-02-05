import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddScpi = () => {
  const [formData, setFormData] = useState({
    nomscpi: '',
    typescpi: '',
    categoriecpi: '',
    capitalisation: '',
    date_creation: '',
    idSocieteGest: ''
  });

  const navigate = useNavigate();
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
      const response = await fetch('http://localhost:5000/Addscpi', {
        method: 'POST',
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

      alert('SCPI ajoutée avec succès');
      navigate('/admin/scpis');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la SCPI:', error);
      alert('Une erreur est survenue, veuillez réessayer.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ajouter une SCPI</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom SCPI</label>
          <input
            type="text"
            className="form-control"
            name="nomscpi"
            value={formData.nomscpi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Type SCPI</label>
          <input
            type="text"
            className="form-control"
            name="typescpi"
            value={formData.typescpi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Catégorie SCPI</label>
          <input
            type="text"
            className="form-control"
            name="categoriecpi"
            value={formData.categoriecpi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
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
          <label>Date de création</label>
          <input
            type="date"
            className="form-control"
            name="date_creation"
            value={formData.date_creation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>ID Société de gestion</label>
          <input
            type="number"
            className="form-control"
            name="idSocieteGest"
            value={formData.idSocieteGest}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
  );
};

export default AddScpi;
