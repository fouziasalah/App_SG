import React, { useEffect, useState } from "react";
import { GetScpiFiltredByIdSGOrTypeOrCateg } from '../services/societeservice';

const ScpiList = () => {
  const [scpis, setScpis] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ type: '', categorie: '', societeId: '' });
 
  useEffect(() => {
    const fetchScpis = async () => {
      try {
        const data = await GetScpiFiltredByIdSGOrTypeOrCateg(filters);
        console.log(" mes filtres ",filters);
        setScpis(data);
      } catch (err) {
        setError("Erreur lors du chargement des SCPI.");
      }
    };
    fetchScpis();
  }, [filters]);

  // Filtrer les SCPIs selon son nNOM
  const filteredScpis = scpis.filter(scpi =>
    scpi.nomscpi.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        
        {/* Sidebar des filtres */}
        <div className="col-md-3">
          <div className="bg-light p-3 rounded shadow position-sticky" style={{ top: "80px" }}>
            <h5 className="mb-3">Filtres</h5>
            <input
              type="text"
              name="type"
              placeholder="Filtrer par Type"
              value={filters.type}
              onChange={handleFilterChange}
              className="form-control mb-3"
            />
            {/* <input
              type="text"
              name="societeId"
              placeholder="Filtrer par Société de Gestion..."
              value={filters.societeId}
              onChange={handleFilterChange}
              className="form-control mb-3"
            /> */}
            <input
              type="text"
              name="categorie"
              placeholder="Filtrer par Catégorie"
              value={filters.categorie}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
        </div>
  
        {/*  SCPIs */}
        <div className="col-md-9">
          <h2 className="mb-4">Liste des SCPIs</h2>
          {error && <p className="text-danger">{error}</p>}
  
        
          <div className="row">
            {filteredScpis.length > 0 ? (
              filteredScpis.map((scpi) => (
                <div key={scpi.idscpi} className="col-xl-4 col-lg-4 col-md-6 mb-4">
                  <div className="card h-100 shadow-lg rounded p-3">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h4 className="card-title">{scpi.nomscpi}</h4>
                        <p className="card-text"><strong>Type :</strong> {scpi.typescpi}</p>
                        <p className="card-text"><strong>Catégorie :</strong> {scpi.categoriecpi}</p>
                        <p className="card-text"><strong>Capitalisation :</strong> {scpi.capitalisation}</p>
                        <p className="card-text"><strong>Date de création :</strong> {new Date(scpi.date_creation).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-12 text-center">Aucune SCPI ne correspond au filtre.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};



export default ScpiList;
