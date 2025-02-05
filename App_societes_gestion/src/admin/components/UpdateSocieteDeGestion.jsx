
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSocieteDeGestion = () => {
  const [formData, setFormData] = useState({
    nomsocietgest: '',
    date_creation: '',
    nombre_de_fonds: '',
    encours_global_scpi: '',
    effectif: '',
    localisation: '',
    description: ''
  });
  const { id } = useParams(); 
  const navigate = useNavigate();

  //  changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchSociete = async () => {
      try {
        const response = await fetch(`http://localhost:5000/societes-de-gestion/${id}`);
        const data = await response.json();
        console.log(" SG récupere pr la modifer",data);
        setFormData(data); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la société', error);
      }
    };

    fetchSociete();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/societes-de-gestion/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        alert(`Erreur: ${errorResponse.error}`);
        console.error('Erreur:', errorResponse);
        return;
      }

      const result = await response.json();
      alert('Société de gestion mise à jour avec succès');
      console.log('Société mise à jour:', result);
      navigate('/admin');
    } catch (error) {
      console.error('Erreur lors de la mise de SG:', error);
      alert('Une erreur Veuillez réessayer.!!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Modifier une Société de Gestion</h2>
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
  value={formData.date_creation ? formData.date_creation.split('T')[0] : ''} 
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

        <button type="submit" className="btn btn-primary btn-block">Modifier</button>
      </form>
    </div>
  );
};

export default UpdateSocieteDeGestion;
