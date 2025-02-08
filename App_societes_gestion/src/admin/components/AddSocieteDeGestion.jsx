
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddSocieteDeGestion = () => {
  const [formData, setFormData] = useState({
    nomsocietgest: '',
    date_creation: '',
    nombre_de_fonds: '',
    encours_global_scpi: '',
    effectif: '',
    localisation: '',
    description: ''
  });
  const navigate = useNavigate(); 
  //*changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/societes-de-gestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Société de gestion ajoutée avec succès');
        setFormData({
          nomsocietgest: '',
          date_creation: '',
          nombre_de_fonds: '',
          encours_global_scpi: '',
          effectif: '',
          localisation: '',
          description: ''
        });
         navigate('/admin');
        } else {
          const error = await response.json();
          alert(error.error);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout de SG:', error);
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    };
     

  return (
    <div className="container mt-5">
      <h2 className="text-center">Ajouter une Société de Gestion</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="nomsocietgest">Société de gestion</label>
          <input
            type="text"
            className="form-control"
            id="nomsocietgest"
            name="nomsocietgest"
            value={formData.nomsocietgest}
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
            value={formData.date_creation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nombre_de_fonds">Nombre de fonds</label>
          <input
            type="number"
            className="form-control"
            id="nombre_de_fonds"
            name="nombre_de_fonds"
            value={formData.nombre_de_fonds}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="encours_global_scpi">Encours global SCPI</label>
          <input
            type="number"
            className="form-control"
            id="encours_global_scpi"
            name="encours_global_scpi"
            value={formData.encours_global_scpi}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="effectif">Effectif</label>
          <input
            type="number"
            className="form-control"
            id="effectif"
            name="effectif"
            value={formData.effectif}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="localisation">Localisation</label>
          <input
            type="text"
            className="form-control"
            id="localisation"
            name="localisation"
            value={formData.localisation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Ajouter</button>
      </form>
    </div>
  );
};

export default AddSocieteDeGestion;
