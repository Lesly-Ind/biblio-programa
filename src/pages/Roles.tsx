export default function Roles() {
  return (
    <div className="container">

      <h2 className="mb-4">Gestión de Roles</h2>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Rol</th>
          </tr>

        </thead>

        <tbody>

          <tr>
            <td>1</td>
            <td>Administrador</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Bibliotecario</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}