import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PannelAdmin = () => {
  const [societes, setSocietes] = useState([]);

  // GET ALL sociétés de gestion
  useEffect(() => {
    const fetchSocietes = async () => {
      try {
        const response = await fetch('http://localhost:5000/societes-de-gestion');
        const data = await response.json();
        setSocietes(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des sociétés de gestion', error);
      }
    };

    fetchSocietes();
  }, []);

  // Supprimer une société
  const handleDelete = async (idsocietgest) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette société de gestion ?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/societes-de-gestion/${idsocietgest}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Société de gestion supprimée avec succès');
        setSocietes(societes.filter(societe => societe.idsocietgest !== idsocietgest));
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la société', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="d-flex">
      {/* //////////////////////Sidebar */}
      <div className="bg-light p-3" style={{ width: '250px', height: '100vh' }}>
        <h4 className="mb-4">Panneau d'administration</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/admin" className="nav-link active">Liste des sociétés de gestion</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/scpis/:id" className="nav-link">Liste des SCPI</Link>
          </li>
        </ul>
      </div>

 
      <div className="container mt-4" style={{ flex: 1 }}>
        <h2 className="text-center mb-4">Liste des Sociétés de Gestion</h2>
        <div className="d-flex justify-content-between mb-4">
        <div className="ml-auto">
            <Link to="/admin/ajouter-societe" className="btn btn-success">Ajouter une société</Link>
        </div>
        </div>


        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Société de gestion</th>
                <th>Date de création</th>
                <th>Nombre de fonds</th>
                <th>Encours global SCPI</th>
                <th>Effectif</th>
                <th>Localisation</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {societes.map(societe => (
                <tr key={societe.idsocietgest}>
                  <td>{societe.nomsocietgest}</td>
                  <td>{new Date(societe.date_creation).toLocaleDateString()}</td>
                  <td>{societe.nombre_de_fonds}</td>
                  <td>{societe.encours_global_scpi}</td>
                  <td>{societe.effectif}</td>
                  <td>{societe.localisation}</td>
                  <td>{societe.description}</td>
                  <td>
                    <Link to={`/admin/modifier-societe/${societe.idsocietgest}`} className="btn btn-warning mr-2">Modifier</Link>
                    <button
                      onClick={() => handleDelete(societe.idsocietgest)}
                      className="btn btn-danger"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PannelAdmin;
