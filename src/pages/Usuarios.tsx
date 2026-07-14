import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import Swal from "sweetalert2";


export default function Usuarios() {


const [usuarios,setUsuarios]=useState<any[]>([]);
const [roles,setRoles]=useState<any[]>([]);

const [mostrar,setMostrar]=useState(false);

const [editando,setEditando]=useState<number|null>(null);



const [form,setForm]=useState({

nombre:"",
apellido:"",
correo:"",
password:"",
telefono:"",
direccion:"",
numeroDocumento:"",
rolId:""

});



useEffect(()=>{

cargarUsuarios();

cargarRoles();

},[]);




async function cargarUsuarios(){

try{

const res=await api.get("/usuarios");

setUsuarios(res.data);


}catch(e){

console.log(e);

}

}




async function cargarRoles(){

try{

const res=await api.get("/roles");

setRoles(res.data);


}catch(e){

console.log(e);

}

}





function limpiar(){


setForm({

nombre:"",
apellido:"",
correo:"",
password:"",
telefono:"",
direccion:"",
numeroDocumento:"",
rolId:""

});


setEditando(null);


}




function abrirNuevo(){

limpiar();

setMostrar(true);

}




function editar(usuario:any){


setEditando(usuario.id);


setForm({

nombre:usuario.nombre,

apellido:usuario.apellido,

correo:usuario.correo,

password:"",

telefono:usuario.telefono || "",

direccion:usuario.direccion || "",

numeroDocumento:usuario.numeroDocumento || "",

rolId:String(usuario.rolId)

});



setMostrar(true);


}







async function guardar(){


try{


if(editando===null){


await api.post("/usuarios",{

...form,

rolId:Number(form.rolId)

});


Swal.fire(

"Correcto",

"Usuario creado",

"success"

);



}else{


await api.patch(

`/usuarios/${editando}`,

{

...form,

rolId:Number(form.rolId)

}

);



Swal.fire(

"Correcto",

"Usuario actualizado",

"success"

);



}



setMostrar(false);

cargarUsuarios();



}catch(e:any){


Swal.fire(

"Error",

e.response?.data?.message || "Error",

"error"

);


}


}







async function eliminar(id:number){


const ok=await Swal.fire({

title:"¿Eliminar usuario?",

icon:"warning",

showCancelButton:true


});


if(!ok.isConfirmed)return;



await api.delete(

`/usuarios/${id}`

);



Swal.fire(

"Correcto",

"Usuario eliminado",

"success"

);



cargarUsuarios();


}






return(

<MainLayout>



<div className="header-page">


<h1 className="page-title">

Gestión de Usuarios

</h1>



<button

className="btn-primary"

onClick={abrirNuevo}

>

+ Nuevo Usuario

</button>



</div>






{

mostrar &&

<div className="form-card">


<h2>

{
editando
?
"Editar Usuario"
:
"Nuevo Usuario"
}

</h2>



<div className="form-grid">



<input

placeholder="Nombre"

value={form.nombre}

onChange={
e=>setForm({
...form,
nombre:e.target.value
})
}

/>





<input

placeholder="Apellido"

value={form.apellido}

onChange={
e=>setForm({
...form,
apellido:e.target.value
})
}

/>





<input

placeholder="Correo"

value={form.correo}

onChange={
e=>setForm({
...form,
correo:e.target.value
})
}

/>





<input

type="password"

placeholder="Contraseña"

value={form.password}

onChange={
e=>setForm({
...form,
password:e.target.value
})
}

/>





<input

placeholder="Documento"

value={form.numeroDocumento}

onChange={
e=>setForm({
...form,
numeroDocumento:e.target.value
})
}

/>





<input

placeholder="Teléfono"

value={form.telefono}

onChange={
e=>setForm({
...form,
telefono:e.target.value
})
}

/>





<input

placeholder="Dirección"

value={form.direccion}

onChange={
e=>setForm({
...form,
direccion:e.target.value
})
}

/>





<select

value={form.rolId}

onChange={
e=>setForm({
...form,
rolId:e.target.value
})
}

>


<option value="">

Seleccione rol

</option>



{

roles.map(r=>(


<option

key={r.id}

value={r.id}

>

{r.nombre}

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

onClick={()=>{

setMostrar(false);

limpiar();

}}

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

<th>Nombre</th>

<th>Correo</th>

<th>Rol</th>

<th>Estado</th>

<th>Acciones</th>

</tr>

</thead>




<tbody>



{

usuarios.map(u=>(


<tr key={u.id}>


<td>

{u.id}

</td>



<td>

{u.nombre} {u.apellido}

</td>




<td>

{u.correo}

</td>




<td>

{u.rol?.nombre}

</td>




<td>

{u.estado ? "Activo":"Inactivo"}

</td>




<td>



<button

className="btn-warning"

onClick={()=>editar(u)}

>

Editar

</button>





<button

className="btn-danger"

onClick={()=>eliminar(u.id)}

>

Eliminar

</button>



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