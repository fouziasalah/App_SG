import React, { useState, useEffect } from 'react';
import { Button, Card } from "react-bootstrap";
import { getAllSocieteGestion } from '../services/societeservice';

const SocieteDeGestionList = () => {
  const [societes, setSocietes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocietes = async () => {
      try {
        const data = await getAllSocieteGestion();
        setSocietes(data);
      } catch (err) {
        console.error("Erreur lors du chargement des sociétés :", err);
        setError("Une erreur s'est produite lors du chargement des sociétés.");
      }
    };
    fetchSocietes();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Les sociétés de Gestion</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {societes.map(societe => (
          <div className="col-md-4 mb-4" key={societe.idsocietgest}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{societe.nomsocietgest}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {societe.description.length > 100 
                    ? societe.description.substring(0, 100) + "..."
                    : societe.description
                  }
                </Card.Text>
               
                <Button className="mt-auto" href={`/societes-de-gestion/${societe.idsocietgest}`} variant="primary">
                  Voir plus
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocieteDeGestionList;
