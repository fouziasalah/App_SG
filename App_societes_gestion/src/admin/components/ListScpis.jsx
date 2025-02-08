import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListScpis = () => {
  const [scpis, setScpis] = useState([]);
  useEffect(() => {
    const fetchScpis = async () => {
      try {
        const response = await fetch('http://localhost:5000/GetAllScpis');
        const data = await response.json();
        setScpis(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des SCPI', error);
      }
    };
    fetchScpis();
  }, []);

  // Supprimer une SCPI
  const handleDelete = async (idScpi) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette SCPI ?');
    if (!confirmDelete) return;
  
    setScpis(scpis.filter(scpi => scpi.idScpi !== idScpi));
  
    try {
      const response = await fetch(`http://localhost:5000/DeleteScpi/${idScpi}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('SCPI supprimée avec succès');
      } else {
        alert('Erreur lors de la suppression');
        setScpis(prevScpis => [...prevScpis, scpis.find(scpi => scpi.idScpi === idScpi)]);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la SCPI', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setScpis(prevScpis => [...prevScpis, scpis.find(scpi => scpi.idScpi === idScpi)]);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Liste des SCPI</h2>
      <div className="mb-3">
        <Link to="/admin/ajouter-scpi" className="btn btn-primary">Ajouter une SCPI</Link>
      </div>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Nom SCPI</th>
            <th>Type</th>
            <th>Catégorie</th>
            <th>Société de gestion</th>
            <th>Capitalisation</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        

        <tbody>
          {scpis.map(scpi => (
            <tr key={scpi.idscpi}>
              <td>{scpi.nomscpi}</td>
              <td>{scpi.typescpi}</td>
              <td>{scpi.categoriecpi}</td>
              <td>{scpi.idSocieteGest}</td>
              <td>{scpi.capitalisation}</td>
              <td>{new Date(scpi.date_creation).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/modifier-scpi/${scpi.idscpi}`} className="btn btn-warning mr-2">Modifier</Link>
                <button onClick={() => handleDelete(scpi.idscpi)} className="btn btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListScpis;
