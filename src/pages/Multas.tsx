import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { MdGavel, MdAttachMoney } from "react-icons/md";

interface Multa {
  id: number;
  valor: number;
  motivo: string;
  pagada: boolean;
  prestamo: {
    id: number;
    usuario: {
      nombre: string;
      apellido: string;
    };
    libro: {
      titulo: string;
    };
  };
}

export default function Multas() {

  const [multas, setMultas] = useState<Multa[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    cargarMultas();

  }, []);


  async function cargarMultas() {

    try {

      const res = await api.get("/multas");

      setMultas(res.data);

    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  }


  return (

    <MainLayout>


      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:25
        }}
      >

        <div>

          <h1 className="page-title">
            Gestión de Multas
          </h1>

          <p
            style={{
              color:"#64748B"
            }}
          >
            Control y seguimiento de multas generadas
          </p>

        </div>


        <div
          style={{
            background:"#DC2626",
            color:"white",
            padding:"15px 20px",
            borderRadius:15,
            display:"flex",
            alignItems:"center",
            gap:10
          }}
        >

          <MdGavel size={30}/>

          <div>

            <small>
              Total multas
            </small>

            <h2
              style={{
                margin:0
              }}
            >
              {multas.length}
            </h2>

          </div>


        </div>


      </div>



      {loading ? (

        <div
          style={{
            background:"white",
            padding:30,
            borderRadius:15,
            textAlign:"center"
          }}
        >

          Cargando multas...

        </div>


      ) : (


        <div
          style={{
            background:"white",
            borderRadius:20,
            padding:25,
            boxShadow:"0 10px 25px rgba(0,0,0,.08)",
            overflowX:"auto"
          }}
        >


          <table

            style={{

              width:"100%",
              borderCollapse:"collapse"

            }}

          >


            <thead>

              <tr

                style={{
                  background:"#0F172A",
                  color:"white"
                }}

              >

                <th style={th}>
                  ID
                </th>

                <th style={th}>
                  Usuario
                </th>

                <th style={th}>
                  Libro
                </th>

                <th style={th}>
                  Motivo
                </th>

                <th style={th}>
                  Valor
                </th>

                <th style={th}>
                  Estado
                </th>


              </tr>


            </thead>



            <tbody>


              {multas.map((m)=>(


                <tr
                  key={m.id}
                  style={{
                    borderBottom:"1px solid #E2E8F0"
                  }}
                >


                  <td style={td}>
                    #{m.id}
                  </td>


                  <td style={td}>

                    <strong>

                    {m.prestamo.usuario.nombre}
                    {" "}
                    {m.prestamo.usuario.apellido}

                    </strong>

                  </td>



                  <td style={td}>

                    {m.prestamo.libro.titulo}

                  </td>



                  <td style={td}>

                    {m.motivo}

                  </td>



                  <td style={td}>


                    <div
                      style={{
                        display:"flex",
                        alignItems:"center",
                        gap:5,
                        color:"#DC2626",
                        fontWeight:"bold"
                      }}
                    >

                      <MdAttachMoney/>

                      {m.valor}

                    </div>


                  </td>



                  <td style={td}>


                    <span

                      style={{

                        background:m.pagada
                        ? "#DCFCE7"
                        : "#FEE2E2",

                        color:m.pagada
                        ? "#16A34A"
                        : "#DC2626",

                        padding:"6px 14px",

                        borderRadius:20,

                        fontWeight:600,

                        fontSize:14

                      }}

                    >

                      {m.pagada
                      ? "Pagada"
                      : "Pendiente"}

                    </span>


                  </td>


                </tr>


              ))}



              {multas.length===0 && (

                <tr>

                  <td
                    colSpan={6}
                    style={{
                      textAlign:"center",
                      padding:40,
                      color:"#64748B"
                    }}
                  >

                    No existen multas registradas.

                  </td>


                </tr>


              )}



            </tbody>


          </table>



        </div>


      )}



    </MainLayout>

  );

}



const th = {

  padding:"15px",
  textAlign:"left" as const,
  fontSize:"15px"

};


const td = {

  padding:"15px",
  fontSize:"15px",
  color:"#334155"

};