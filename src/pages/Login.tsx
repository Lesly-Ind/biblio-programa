import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function ingresar(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        correo,
        password,
      });

login( res.data.usuario,res.data.access_token);

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Correo o contraseña incorrectos",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">

      <div className="login-left">

        <div className="overlay">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero"
          >
            <h1>Biblioteca Smart</h1>

            <p>
              Plataforma moderna para la gestión de bibliotecas.
            </p>

            <div className="hero-line"></div>

            <span>
              Tecnología • Organización • Conocimiento
            </span>

          </motion.div>

        </div>

      </div>

      <div className="login-right">

        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <h2>Iniciar sesión</h2>

          <p>Accede a tu cuenta</p>

          <form onSubmit={ingresar}>

            <div className="input-box">

              <FiMail />

              <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />

            </div>

            <div className="input-box">

              <FiLock />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            <button className="login-btn">

              {loading ? "Ingresando..." : "Iniciar sesión"}

            </button>

          </form>

          <div className="register-link">

            ¿No tienes cuenta?

            <Link to="/register">

              Crear cuenta

            </Link>

          </div>

        </motion.div>

      </div>

    </div>
  );
}