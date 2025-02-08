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
import Login from "./admin/authentification/login";
import Signup from "./admin/authentification/Signup";
import Profile from "./admin/authentification/Profile";
import ProtectedRoute from "./admin/authentification/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
          {/* Côté Visiteur */}
        <Route path="/" element={<Layout><SocieteDeGestionList /></Layout>} />
        <Route path="/societe-de-gestion-scpis/:idsocietgest" element={<Layout><SocieteDetails /></Layout>} />
        <Route path="/scpis" element={<Layout><ScpiList /></Layout>} />

          {/* Côté authentification */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />

          {/* Côté admin */}
          <Route path="/admin" element={<ProtectedRoute><PannelAdmin /></ProtectedRoute>} />
          <Route path="/admin/ajouter-societe" element={<ProtectedRoute><AddSocieteDeGestion /></ProtectedRoute>} />
          <Route path="/admin/modifier-societe/:id" element={<ProtectedRoute><UpdateSocieteDeGestion /></ProtectedRoute>} />
          <Route path="/admin/scpis" element={<ProtectedRoute><ListScpis /></ProtectedRoute>} />
          <Route path="/admin/ajouter-scpi" element={<ProtectedRoute><AddScpi /></ProtectedRoute>} />
          <Route path="/admin/modifier-scpi/:id" element={<ProtectedRoute><UpdateScpi /></ProtectedRoute>} />
        </Routes>
    </Router>
  );
}

export default App;
