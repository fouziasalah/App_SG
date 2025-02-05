import { Link } from "react-router-dom";

const AdminNavbar = () => (
  <nav style={{ padding: "10px", background: "#222", color: "white" }}>
    <Link to="/admin/societes" style={{ marginRight: "15px", color: "white" }}>Sociétés de Gestion</Link>
    <Link to="/admin/scpi" style={{ color: "white" }}>SCPI</Link>
  </nav>
);

export default AdminNavbar;
