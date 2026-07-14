import {
  MdDashboard,
  MdPeople,
  MdLibraryBooks,
  MdAssignment,
  MdAdminPanelSettings,
  MdAssessment,
  MdLogout,
  MdGavel,
} from "react-icons/md";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Sidebar() {

  const navigate = useNavigate();

  const { usuario, logout } = useAuth();


  function salir(){

    logout();

    navigate("/login");

  }


  return (

    <aside className="sidebar">


      <div className="brand">

        📚

        <span>
          Biblioteca
          <br/>
          Smart
        </span>

      </div>



      <div className="profile-box">

        <div className="avatar">

          {usuario?.nombre?.charAt(0)}

        </div>


        <strong>
          {usuario?.nombre}
        </strong>


        <small>
          {usuario?.rol}
        </small>


      </div>



      <nav>


        <NavLink to="/">

          <MdDashboard/>

          Dashboard

        </NavLink>



        {(usuario?.rol==="Administrador" ||
        usuario?.rol==="Subadministrador") && (

          <>


          <NavLink to="/usuarios">

            <MdPeople/>

            Usuarios

          </NavLink>



          <NavLink to="/roles">

            <MdAdminPanelSettings/>

            Roles

          </NavLink>


          </>

        )}



        <NavLink to="/libros">

          <MdLibraryBooks/>

          Libros

        </NavLink>




        {(usuario?.rol==="Administrador" ||
        usuario?.rol==="Bibliotecario") && (

          <>

          <NavLink to="/prestamos">

            <MdAssignment/>

            Préstamos

          </NavLink>


          <NavLink to="/multas">

            <MdGavel/>

            Multas

          </NavLink>


          </>

        )}



        {
        usuario?.rol==="Administrador" &&

        <NavLink to="/reportes">

          <MdAssessment/>

          Reportes

        </NavLink>

        }



      </nav>



      <button
      className="logout-btn"
      onClick={salir}
      >

        <MdLogout/>

        Cerrar sesión


      </button>


    </aside>

  );

}