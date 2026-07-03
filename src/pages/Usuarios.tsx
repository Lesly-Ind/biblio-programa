import { useEffect, useState } from "react";
import api from "../services/api";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    api
      .get("/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}