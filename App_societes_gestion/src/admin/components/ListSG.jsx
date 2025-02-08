import { useEffect, useState } from "react";
import axios from "axios";
const ListSG = ({ onEdit }) => {
  const [societes, setSocietes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/societes-de-gestion")
      .then(response => setSocietes(response.data))
      .catch(error => console.error("Erreur :", error));
  }, []);

  const handleDelete = async (idsocietgest) => {
    if (window.confirm("Confirmer la suppression ?")) {
      await axios.delete(`http://localhost:5000/societes-de-gestion/${idsocietgest}`);
      setSocietes(societes.filter(s => s.idsocietgest !== idsocietgest));
    }
  };

  return (
    <div>
      <h2>Sociétés de Gestion</h2>
      <button onClick={() => onEdit(null)}> Ajouter</button>
      <table border="1">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Localisation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {societes.map(s => (
            <tr key={s.idsocietgest}>
              <td>{s.nomsocietgest}</td>
              <td>{s.localisation}</td>
              <td>
                <button onClick={() => onEdit(s)}>Modifier</button>
                <button onClick={() => handleDelete(s.idsocietgest)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSG;
