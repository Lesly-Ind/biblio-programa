import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

import {
  MdPeople,
  MdLibraryBooks,
  MdAssignment,
  MdAttachMoney,
} from "react-icons/md";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function Dashboard() {

  const { usuario } = useAuth();

  const [usuarios, setUsuarios] = useState(0);
  const [libros, setLibros] = useState(0);
  const [prestamos, setPrestamos] = useState(0);
  const [multas, setMultas] = useState(0);

  useEffect(() => {

    cargarDatos();

  }, []);

 async function cargarDatos(){

  try{

    const res = await api.get("/dashboard");

setUsuarios(res.data.usuarios);
setLibros(res.data.libros);
setPrestamos(res.data.prestamos);
setMultas(res.data.multas);


  }catch(error){

    console.log(error);

  }

}

  const data = {

    labels: [
      "Usuarios",
      "Libros",
      "Préstamos",
      "Multas",
    ],

    datasets: [

      {

        label: "Sistema Biblioteca",

        data: [

          usuarios,

          libros,

          prestamos,

          multas,

        ],

        backgroundColor: [

          "#2563EB",

          "#16A34A",

          "#F59E0B",

          "#DC2626",

        ],

      },

    ],

  };

  return (

    <MainLayout>

      <h1 className="page-title">

        Bienvenido {usuario?.nombre}

      </h1>

      <p
        style={{
          marginBottom: 25,
          color: "#555",
        }}
      >

        Rol:

        <strong>

          {" "}

          {usuario?.rol}

        </strong>

      </p>

      <div className="cards">

        <div className="card-dashboard">

          <div>

            <p>Usuarios</p>

            <h2>{usuarios}</h2>

          </div>

          <MdPeople size={45} />

        </div>

        <div className="card-dashboard">

          <div>

            <p>Libros</p>

            <h2>{libros}</h2>

          </div>

          <MdLibraryBooks size={45} />

        </div>

        <div className="card-dashboard">

          <div>

            <p>Préstamos</p>

            <h2>{prestamos}</h2>

          </div>

          <MdAssignment size={45} />

        </div>

        <div className="card-dashboard">

          <div>

            <p>Multas</p>

            <h2>{multas}</h2>

          </div>

          <MdAttachMoney size={45} />

        </div>

      </div>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          marginTop: 30,
        }}
      >

        <h3>

          Estadísticas del Sistema

        </h3>

        <Bar data={data} />

      </div>

    </MainLayout>

  );

}