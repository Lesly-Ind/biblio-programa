import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import Swal from "sweetalert2";


export default function Prestamos() {


const [prestamos,setPrestamos]=useState<any[]>([]);
const [usuarios,setUsuarios]=useState<any[]>([]);
const [libros,setLibros]=useState<any[]>([]);


const [mostrar,setMostrar]=useState(false);



const [form,setForm]=useState({

usuarioId:"",
libroId:""

});





useEffect(()=>{

cargar();

},[]);






async function cargar(){


const [

p,

u,

l

]=await Promise.all([


api.get("/prestamos"),

api.get("/usuarios"),

api.get("/libros")


]);



setPrestamos(p.data);

setUsuarios(u.data);

setLibros(l.data);



}








async function guardar(){


try{


await api.post("/prestamos",{


usuarioId:Number(form.usuarioId),

libroId:Number(form.libroId)



});



Swal.fire(

"Correcto",

"Préstamo registrado",

"success"

);



setMostrar(false);



setForm({

usuarioId:"",

libroId:""

});



cargar();



}catch(e:any){



Swal.fire(

"Error",

e.response?.data?.message || "Error",

"error"

);



}



}








async function devolver(id:number){


const ok=await Swal.fire({

title:"¿Registrar devolución?",

icon:"question",

showCancelButton:true


});



if(!ok.isConfirmed)return;




await api.patch(

`/prestamos/devolver/${id}`

);




Swal.fire(

"Correcto",

"Libro devuelto",

"success"

);



cargar();



}








return(

<MainLayout>




<div className="header-page">


<h1 className="page-title">

Gestión de Préstamos

</h1>




<button

className="btn-primary"

onClick={()=>setMostrar(true)}

>

+ Nuevo Préstamo

</button>



</div>







{

mostrar &&


<div className="form-card">


<h2>

Nuevo préstamo

</h2>




<div className="form-grid">





<select

value={form.usuarioId}

onChange={
e=>setForm({

...form,

usuarioId:e.target.value

})

}

>


<option value="">

Seleccione usuario

</option>



{

usuarios.map(u=>(


<option

key={u.id}

value={u.id}

>

{u.nombre} {u.apellido}

</option>



))


}



</select>








<select

value={form.libroId}

onChange={
e=>setForm({

...form,

libroId:e.target.value

})

}

>



<option value="">

Seleccione libro

</option>





{

libros

.filter(
l=>l.disponibles>0
)

.map(l=>(


<option

key={l.id}

value={l.id}

>

{l.titulo}

</option>



))


}



</select>





</div>





<div className="actions">



<button

className="btn-success"

onClick={guardar}

>

Guardar

</button>




<button

className="btn-danger"

onClick={()=>setMostrar(false)}

>

Cancelar

</button>




</div>



</div>



}







<div className="table-card">



<table>



<thead>

<tr>


<th>ID</th>

<th>Usuario</th>

<th>Libro</th>

<th>Monto</th>

<th>Fecha devolución</th>

<th>Estado</th>

<th>Acciones</th>



</tr>


</thead>






<tbody>



{

prestamos.map(p=>(


<tr key={p.id}>


<td>

{p.id}

</td>



<td>

{p.usuario?.nombre}

{ " " }

{p.usuario?.apellido}

</td>




<td>

{p.libro?.titulo}

</td>





<td>

${p.monto}

</td>






<td>

{

new Date(
p.fechaDevolucion
)
.toLocaleDateString()

}

</td>






<td>


<span

className={
p.estado==="DEVUELTO"
?
"badge-success"
:
"badge-warning"
}

>

{p.estado}


</span>


</td>






<td>



{

p.estado==="ACTIVO"

&&


<button

className="btn-danger"

onClick={
()=>devolver(p.id)
}

>

Devolver

</button>



}



</td>




</tr>



))


}



</tbody>




</table>




</div>





</MainLayout>


)


}