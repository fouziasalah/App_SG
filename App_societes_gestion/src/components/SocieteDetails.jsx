import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSocieteGestionByIDandScpis } from "../services/societeservice";

const SocieteDetails = () => {
  const { idsocietgest } = useParams(); 
  const [societe, setSociete] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSociete = async () => {
      try {
        const data = await getSocieteGestionByIDandScpis(idsocietgest);
        setSociete(data);
      } catch (err) {
        setError("Une erreur s'est produite lors du chargement de la société.");
      }
    };
    fetchSociete();
  }, [idsocietgest]);

  if (error) {
    return <p className="alert alert-danger">{error}</p>;
  }

  if (!societe) {
    return <p>Chargement...</p>;
  }

 
  return (
    <div className="container my-4">
      <div className="card shadow-lg rounded-3 p-4 mt-5">
        <h2>{societe.nomsocietgest}</h2>
        <p>{societe.description}</p>
        <p><strong>Localisation :</strong> {societe.localisation}</p>
        <p><strong>Création :</strong> {new Date(societe.date_creation).toLocaleDateString()}</p>
        <p><strong>Encours global (M€) :</strong> {societe.encours_global_scpi}</p>
        <p><strong>Nombre de fonds :</strong> {societe.nombre_de_fonds}</p>
        <p><strong>Effectif :</strong> {societe.nombre_de_fonds}</p>
      </div>
  
      <h3 className="mt-4">Les SCPIs de : {societe.nomsocietgest}</h3>
      <div className="row">
        {societe.scpis && societe.scpis.length > 0 ? (
          societe.scpis.map(scpi => (
            <div className="col-md-4 mb-3" key={scpi.idscpi}>
              <div className="card shadow-lg rounded-3">
                <div className="card-body">
                  <h5 className="card-title">{scpi.nomscpi}</h5>
                  <p className="card-text">Type : {scpi.typescpi}</p>
                  <p className="card-text">Catégorie : {scpi.categoriecpi}</p>
                  <p className="card-text">Capitalisation : {scpi.capitalisation}</p>
                  <p className="card-text">Création : {new Date(scpi.date_creation).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune SCPI pour cette société.</p>
        )}
      </div>
    </div>
  );
  


};

export default SocieteDetails;
