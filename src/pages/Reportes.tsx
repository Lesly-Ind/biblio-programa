import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

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

export default function Reportes() {

  const [usuarios,setUsuarios]=useState(0);
  const [libros,setLibros]=useState(0);
  const [prestamos,setPrestamos]=useState(0);
  const [multas,setMultas]=useState(0);

  useEffect(()=>{

    cargar();

  },[]);

 async function cargar(){

  try{

    const res = await api.get("/dashboard");


    setUsuarios(res.data.usuarios);

    setLibros(res.data.libros);

    setPrestamos(res.data.prestamosTotales);

    setMultas(res.data.multasPendientes);


  }catch(error){

    console.log(error);

  }

}

  const data={

    labels:[
      "Usuarios",
      "Libros",
      "Préstamos",
      "Multas"
    ],

    datasets:[

      {

        label:"Sistema Biblioteca",

        data:[
          usuarios,
          libros,
          prestamos,
          multas
        ],

        backgroundColor:[
          "#2563eb",
          "#16a34a",
          "#f59e0b",
          "#dc2626"
        ]

      }

    ]

  }

  return(

    <MainLayout>

      <h1 style={{marginBottom:20}}>

        Reportes del Sistema

      </h1>

      <div
        style={{
          background:"white",
          padding:25,
          borderRadius:12
        }}
      >

        <Bar data={data}/>

      </div>

    </MainLayout>

  )

}