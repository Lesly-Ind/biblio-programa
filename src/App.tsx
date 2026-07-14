import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import Roles from "./pages/Roles";
import Libros from "./pages/Libros";
import Prestamos from "./pages/Prestamos";
import Multas from "./pages/Multas";
import Reportes from "./pages/Reportes";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* DASHBOARD */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* USUARIOS */}
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <Usuarios />
          </ProtectedRoute>
        }
      />

      {/* ROLES */}
      <Route
        path="/roles"
        element={
          <ProtectedRoute>
            <Roles />
          </ProtectedRoute>
        }
      />

      {/* LIBROS */}
      <Route
        path="/libros"
        element={
          <ProtectedRoute>
            <Libros />
          </ProtectedRoute>
        }
      />

      {/* PRÉSTAMOS */}
      <Route
        path="/prestamos"
        element={
          <ProtectedRoute>
            <Prestamos />
          </ProtectedRoute>
        }
      />

      {/* MULTAS */}
      <Route
        path="/multas"
        element={
          <ProtectedRoute>
            <Multas />
          </ProtectedRoute>
        }
      />

      {/* REPORTES */}
      <Route
        path="/reportes"
        element={
          <ProtectedRoute>
            <Reportes />
          </ProtectedRoute>
        }
      />

      {/* REDIRECCIÓN */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}