import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SocieteDeGestionList from "./components/SocieteDeGestionList";
import SocieteDetails from "./components/SocieteDetails";
import ScpiList from "./components/ScpiList";
import 'bootstrap/dist/css/bootstrap.min.css';
import PannelAdmin from "./admin/PannelAdmin";
import AddSocieteDeGestion from "./admin/components/AddSocieteDeGestion";
import UpdateSocieteDeGestion from "./admin/components/UpdateSocieteDeGestion";
import ListScpis from "./admin/components/ListScpis";
import AddScpi from "./admin/components/AddScpi";
import UpdateScpi from "./admin/components/UpdateScpi";
function App() {
  return (
    <Router>
      <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light m-2">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Accueil</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Sociétés de Gestion</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/scpis">SCPIs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          {/* Cote Viisteur */}
          <Route path="/" element={<SocieteDeGestionList />} /> 
          <Route path="/societes-de-gestion/:idsocietgest" element={<SocieteDetails />} /> 
          <Route path="/scpis" element={<ScpiList />} /> 

          {/* Cote admin */}
          <Route path="/admin" element={<PannelAdmin />} />
          <Route path="/admin/ajouter-societe" element={<AddSocieteDeGestion />} /> 
          <Route path="/admin/modifier-societe/:id" element={<UpdateSocieteDeGestion />} /> 


          <Route path="/admin/scpis/:id" element={<ListScpis />} />
          <Route path="/admin/ajouter-scpi" element={<AddScpi />} />
          {/* <Route path="/admin/modifier-scpi/:id/:scpiId" element={<UpdateScpi />} /> */}
          <Route path="/admin/modifier-scpi/:id" element={<UpdateScpi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
