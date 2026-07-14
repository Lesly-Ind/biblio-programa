import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiCreditCard } from "react-icons/fi";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import api from "../services/api";
import "../styles/login.css";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    telefono: "",
    direccion: "",
    numeroDocumento: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function registrar(e: React.FormEvent) {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post("/auth/register", form);

      Swal.fire({
        icon: "success",
        title: "Cuenta creada",
        text: "Ahora puedes iniciar sesión",
        confirmButtonColor: "#2563EB"
      });

      navigate("/login");

    } catch (error: any) {

      Swal.fire({
        icon: "error",
        title: "No fue posible registrarse",
        text: error?.response?.data?.message || "Verifica los datos."
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
            className="hero"
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
          >

            <h1>Biblioteca Smart</h1>

            <p>
              Crea tu cuenta y comienza a utilizar el sistema de gestión bibliotecaria.
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

          <h2>Crear Cuenta</h2>

          <p>Completa la información</p>

          <form onSubmit={registrar}>

            <div className="input-box">
              <FiUser />
              <input
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <FiUser />
              <input
                name="apellido"
                placeholder="Apellido"
                value={form.apellido}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <FiMail />
              <input
                name="correo"
                placeholder="Correo"
                value={form.correo}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <FiCreditCard />
              <input
                name="numeroDocumento"
                placeholder="Número de documento"
                value={form.numeroDocumento}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <FiPhone />
              <input
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <FiMapPin />
              <input
                name="direccion"
                placeholder="Dirección"
                value={form.direccion}
                onChange={handleChange}
              />
            </div>

            <div className="input-box">
              <FiLock />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button className="login-btn">

              {loading ? "Creando cuenta..." : "Crear Cuenta"}

            </button>

          </form>

          <div className="register-link">

            ¿Ya tienes cuenta?

            <Link to="/login">

              Iniciar sesión

            </Link>

          </div>

        </motion.div>

      </div>

    </div>

  );

}