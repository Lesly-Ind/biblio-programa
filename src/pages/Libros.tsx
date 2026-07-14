import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import Swal from "sweetalert2";

export default function Libros() {

  const [libros,setLibros]=useState<any[]>([]);
  const [categorias,setCategorias]=useState<any[]>([]);
  const [autores,setAutores]=useState<any[]>([]);
  const [editoriales,setEditoriales]=useState<any[]>([]);

  const [mostrar,setMostrar]=useState(false);
  const [editando,setEditando]=useState<number|null>(null);


  const [form,setForm]=useState<any>({

    titulo:"",
    isbn:"",
    descripcion:"",
    anioPublicacion:"",
    categoriaId:"",
    autorId:"",
    editorialId:""

  });


  useEffect(()=>{

    cargar();

  },[]);



  async function cargar(){

    const[
      l,
      c,
      a,
      e

    ]=await Promise.all([

      api.get("/libros"),
      api.get("/categorias"),
      api.get("/autores"),
      api.get("/editoriales")

    ]);


    setLibros(l.data);
    setCategorias(c.data);
    setAutores(a.data);
    setEditoriales(e.data);

  }



  function nuevo(){

    setEditando(null);

    setForm({

      titulo:"",
      isbn:"",
      descripcion:"",
      anioPublicacion:"",
      categoriaId:"",
      autorId:"",
      editorialId:""

    });

    setMostrar(true);

  }



  function editar(libro:any){

    setEditando(libro.id);

    setForm({

      titulo:libro.titulo,
      isbn:libro.isbn,
      descripcion:libro.descripcion,
      anioPublicacion:String(libro.anioPublicacion),
      categoriaId:String(libro.categoriaId),
      autorId:String(libro.autorId),
      editorialId:String(libro.editorialId)

    });


    setMostrar(true);

  }



async function guardar(){

try{


const datos={

titulo:form.titulo,

isbn:form.isbn,

descripcion:form.descripcion,

anioPublicacion:Number(form.anioPublicacion),

categoriaId:Number(form.categoriaId),

autorId:Number(form.autorId),

editorialId:Number(form.editorialId)

};



if(editando===null){

await api.post(
"/libros",
datos
);

}else{


await api.patch(
`/libros/${editando}`,
datos
);


}



Swal.fire(
"Correcto",
"Libro guardado",
"success"
);



setMostrar(false);

cargar();



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

title:"¿Eliminar libro?",

icon:"warning",

showCancelButton:true


});


if(!ok.isConfirmed)return;



await api.delete(
`/libros/${id}`
);



Swal.fire(

"Correcto",

"Libro eliminado",

"success"

);


cargar();


}




return(

<MainLayout>


<div className="header-page">


<h1 className="page-title">

Gestión de Libros

</h1>



<button

className="btn-primary"

onClick={nuevo}

>

+ Nuevo Libro

</button>


</div>




{mostrar &&

<div className="form-card">


<h2>

{editando 
? "Editar Libro"
:"Nuevo Libro"}

</h2>



<div className="form-grid">



<input

placeholder="Título"

value={form.titulo}

onChange={
e=>setForm({
...form,
titulo:e.target.value
})
}

/>



<input

placeholder="ISBN"

value={form.isbn}

onChange={
e=>setForm({
...form,
isbn:e.target.value
})
}

/>



<textarea

placeholder="Descripción"

value={form.descripcion}

onChange={
e=>setForm({
...form,
descripcion:e.target.value
})
}

/>



<input

placeholder="Año publicación"

value={form.anioPublicacion}

onChange={
e=>setForm({
...form,
anioPublicacion:e.target.value
})
}

/>




<select

value={form.categoriaId}

onChange={
e=>setForm({
...form,
categoriaId:e.target.value
})
}

>


<option value="">
Categoría
</option>


{
categorias.map(c=>(

<option
key={c.id}
value={c.id}
>

{c.nombre}

</option>


))

}


</select>




<select

value={form.autorId}

onChange={
e=>setForm({
...form,
autorId:e.target.value
})
}

>


<option value="">
Autor
</option>


{
autores.map(a=>(

<option

key={a.id}

value={a.id}

>

{a.nombre}

</option>


))

}


</select>




<select

value={form.editorialId}

onChange={
e=>setForm({
...form,
editorialId:e.target.value
})
}

>


<option value="">
Editorial
</option>


{
editoriales.map(e=>(

<option

key={e.id}

value={e.id}

>

{e.nombre}

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

<th>Título</th>

<th>Autor</th>

<th>Categoría</th>

<th>Editorial</th>

<th>Acciones</th>

</tr>

</thead>



<tbody>


{

libros.map(l=>(


<tr key={l.id}>


<td>
{l.id}
</td>


<td>
{l.titulo}
</td>


<td>
{l.autor?.nombre}
</td>


<td>
{l.categoria?.nombre}
</td>


<td>
{l.editorial?.nombre}
</td>



<td>


<button

className="btn-warning"

onClick={()=>editar(l)}

>

Editar

</button>



<button

className="btn-danger"

onClick={()=>eliminar(l.id)}

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