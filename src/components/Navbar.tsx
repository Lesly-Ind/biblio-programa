import { MdNotifications } from "react-icons/md";

export default function Navbar(){

const usuario =
JSON.parse(localStorage.getItem("usuario")||"{}");


return(

<header className="navbar">


<div>

<h2>

Panel Administrativo

</h2>


<p>

Sistema de Gestión Bibliotecaria

</p>


</div>



<div className="user">


<div className="notification">

<MdNotifications size={25}/>

</div>



<div className="user-info">


<strong>

{usuario.nombre || "Administrador"}

</strong>


<small>

{usuario.rol || ""}

</small>


</div>



<div className="avatar-nav">

{usuario.nombre?.charAt(0) || "A"}

</div>


</div>



</header>


)

}