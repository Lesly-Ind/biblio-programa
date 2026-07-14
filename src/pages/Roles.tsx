import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import Swal from "sweetalert2";
import { MdAdminPanelSettings } from "react-icons/md";


export default function Roles() {

  const [roles, setRoles] = useState<any[]>([]);

  const [nombre, setNombre] = useState("");

  const [descripcion, setDescripcion] = useState("");

  const [editando, setEditando] = useState<number | null>(null);

  const [mostrar, setMostrar] = useState(false);



  useEffect(() => {

    cargarRoles();

  }, []);



  async function cargarRoles() {

    try {

      const res = await api.get("/roles");

      setRoles(res.data);

    } catch (e) {

      console.log(e);

    }

  }



  function nuevo() {

    setEditando(null);

    setNombre("");

    setDescripcion("");

    setMostrar(true);

  }



  function editar(r:any) {

    setEditando(r.id);

    setNombre(r.nombre);

    setDescripcion(r.descripcion || "");

    setMostrar(true);

  }



  async function guardar() {

    try {


      if(editando === null) {


        await api.post("/roles", {

          nombre,

          descripcion

        });


        Swal.fire(
          "Correcto",
          "Rol creado",
          "success"
        );


      } else {


        await api.patch(`/roles/${editando}`, {

          nombre,

          descripcion

        });


        Swal.fire(
          "Correcto",
          "Rol actualizado",
          "success"
        );


      }



      setMostrar(false);

      cargarRoles();



    } catch(e:any) {


      Swal.fire(

        "Error",

        e?.response?.data?.message || "Error",

        "error"

      );


    }

  }




  async function eliminar(id:number) {


    const ok = await Swal.fire({

      title:"¿Eliminar rol?",

      icon:"warning",

      showCancelButton:true,

      confirmButtonText:"Eliminar",

      cancelButtonText:"Cancelar"

    });



    if(!ok.isConfirmed) return;



    await api.delete(`/roles/${id}`);



    Swal.fire(

      "Correcto",

      "Rol eliminado",

      "success"

    );



    cargarRoles();


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

            Gestión de Roles

          </h1>


          <p

            style={{

              color:"#64748B"

            }}

          >

            Administración de permisos del sistema

          </p>

        </div>



        <button

          onClick={nuevo}

          style={{

            background:"#2563EB",

            color:"white",

            border:"none",

            padding:"12px 20px",

            borderRadius:10,

            cursor:"pointer",

            fontWeight:600

          }}

        >

          + Nuevo Rol

        </button>



      </div>





      {mostrar && (


        <div

          style={{

            background:"white",

            padding:25,

            borderRadius:20,

            marginBottom:25,

            boxShadow:"0 10px 25px rgba(0,0,0,.08)"

          }}

        >


          <h2>

            {editando
            ? "Editar Rol"
            : "Nuevo Rol"}

          </h2>



          <div

            style={{

              display:"grid",

              gap:15,

              marginTop:20

            }}

          >


            <input

              placeholder="Nombre del rol"

              value={nombre}

              onChange={(e)=>setNombre(e.target.value)}

              style={inputStyle}

            />



            <textarea

              placeholder="Descripción"

              value={descripcion}

              onChange={(e)=>setDescripcion(e.target.value)}

              style={textareaStyle}

            />


          </div>




          <div

            style={{

              display:"flex",

              gap:10,

              marginTop:20

            }}

          >



            <button

              onClick={guardar}

              style={{

                background:"#16A34A",

                color:"white",

                border:"none",

                padding:"10px 20px",

                borderRadius:8,

                cursor:"pointer"

              }}

            >

              Guardar

            </button>




            <button

              onClick={()=>setMostrar(false)}

              style={{

                background:"#DC2626",

                color:"white",

                border:"none",

                padding:"10px 20px",

                borderRadius:8,

                cursor:"pointer"

              }}

            >

              Cancelar

            </button>



          </div>


        </div>


      )}





      <div

        style={{

          background:"white",

          padding:25,

          borderRadius:20,

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

              <th style={th}>ID</th>

              <th style={th}>Nombre</th>

              <th style={th}>Descripción</th>

              <th style={th}>Acciones</th>


            </tr>


          </thead>




          <tbody>


            {roles.map((r)=>(


              <tr

                key={r.id}

                style={{

                  borderBottom:"1px solid #E2E8F0"

                }}

              >


                <td style={td}>

                  {r.id}

                </td>



                <td style={td}>


                  <div

                    style={{

                      display:"flex",

                      alignItems:"center",

                      gap:8,

                      fontWeight:600

                    }}

                  >

                    <MdAdminPanelSettings color="#2563EB"/>

                    {r.nombre}

                  </div>


                </td>




                <td style={td}>

                  {r.descripcion || "Sin descripción"}

                </td>




                <td style={td}>


                  <button

                    onClick={()=>editar(r)}

                    style={editBtn}

                  >

                    Editar

                  </button>




                  <button

                    onClick={()=>eliminar(r.id)}

                    style={deleteBtn}

                  >

                    Eliminar

                  </button>


                </td>


              </tr>


            ))}



          </tbody>



        </table>



      </div>




    </MainLayout>

  );

}




const inputStyle = {

  padding:"12px",

  border:"1px solid #CBD5E1",

  borderRadius:"10px",

  fontSize:"15px"

};



const textareaStyle = {

  padding:"12px",

  border:"1px solid #CBD5E1",

  borderRadius:"10px",

  height:"100px",

  resize:"none" as const

};



const th = {

  padding:"15px",

  textAlign:"left" as const

};



const td = {

  padding:"15px",

  color:"#334155"

};



const editBtn = {

  background:"#F59E0B",

  color:"white",

  border:"none",

  padding:"7px 12px",

  borderRadius:7,

  marginRight:10,

  cursor:"pointer"

};



const deleteBtn = {

  background:"#DC2626",

  color:"white",

  border:"none",

  padding:"7px 12px",

  borderRadius:7,

  cursor:"pointer"

};