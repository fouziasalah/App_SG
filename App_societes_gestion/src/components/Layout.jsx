import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light m-0 fixed-top w-100 mb-3">
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

      <main className="container mt-5 pt-5">
        {children}
      </main>
    </div>
  );
};

export default Layout;
