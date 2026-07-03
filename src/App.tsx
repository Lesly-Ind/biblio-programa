import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Roles from "./pages/Roles";

export default function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>

      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",
          background: "#111827",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          📚 Biblioteca
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          <Link
            to="/"
            style={linkStyle}
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/usuarios"
            style={linkStyle}
          >
            👥 Usuarios
          </Link>

          <Link
            to="/roles"
            style={linkStyle}
          >
            🔐 Roles
          </Link>

        </nav>
      </div>

      {/* CONTENIDO */}
      <div style={{ flex: 1 }}>

        {/* NAVBAR */}
        <div
          style={{
            background: "#2563eb",
            color: "white",
            padding: "15px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Sistema de Biblioteca</h3>
          <span>👤 Admin</span>
        </div>

        {/* PAGES */}
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </div>

      </div>

    </div>
  );
}

const linkStyle: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "8px",
  background: "#1f2937",
};