export default function Dashboard() {
  return (
    <div>

      <h2 style={{ marginBottom: "20px" }}>
        📊 Dashboard
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "15px"
      }}>

        <Card title="Usuarios" color="#3b82f6" />
        <Card title="Roles" color="#10b981" />
        <Card title="Libros" color="#f59e0b" />
        <Card title="Préstamos" color="#ef4444" />

      </div>

    </div>
  );
}

function Card({ title, color }: { title: string; color: string }) {
  return (
    <div style={{
      background: color,
      color: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "28px", fontWeight: "bold" }}>+</p>
    </div>
  );
}