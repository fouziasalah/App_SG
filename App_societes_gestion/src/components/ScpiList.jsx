import React, { useEffect, useState } from "react";
import { getAllScpis } from '../services/societeservice';

const ScpiList = () => {
  const [scpis, setScpis] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScpis = async () => {
      try {
        const data = await getAllScpis();
        setScpis(data);  
      } catch (err) {
        setError("Erreur lors du chargement des SCPI.");
      }
    };
    fetchScpis();
  }, []);  

  // Filtrer les SCPI en fonction du terme de recherche
  const filteredScpis = scpis.filter(scpi =>
    scpi.nomscpi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2>Liste des SCPIs</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div className="mb-3">
        <input
          type="text"
          placeholder="Rechercher une SCPI par nom..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="list-group">
        {filteredScpis.length > 0 ? (
          filteredScpis.map(scpi => (
            <div key={scpi.idscpi} className="list-group-item">
              <h5>{scpi.nomscpi}</h5>
              <p>Type : {scpi.typescpi}</p>
              <p>Catégorie : {scpi.categoriecpi}</p>
              <p>Capitalisation : {scpi.capitalisation}</p>
              <p>Date de création : {new Date(scpi.date_creation).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>Aucune SCPI ne correspond au filtre.</p>
        )}
      </div>
    </div>
  );
};

export default ScpiList;
