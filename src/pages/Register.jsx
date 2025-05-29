import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

function Register() {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info");

  const validarCampos = () => {
    if (!dni.trim() || !nombre.trim()) {
      return "Todos los campos son obligatorios.";
    }

    if (!/^\d{7,8}$/.test(dni)) {
      return "El DNI debe tener entre 7 y 8 dígitos numéricos.";
    }

    if (nombre.length < 2) {
      return "El nombre debe tener al menos 2 caracteres.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validarCampos();
    if (error) {
      setMensaje(error);
      setTipoMensaje("error");
      return;
    }

    try {
      await addDoc(collection(db, "usuarios"), {
        dni,
        nombre,
        creado: new Date()
      });

      setMensaje("✅ Usuario registrado con éxito");
      setTipoMensaje("success");
      setDni("");
      setNombre("");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMensaje("❌ Ocurrió un error. Intentalo de nuevo.");
      setTipoMensaje("error");
    }
  };

  const inputStyle = {
    padding: "8px",
    marginBottom: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "4px",
    fontWeight: "bold"
  };

  const mensajeStyle = {
    marginTop: "10px",
    color: tipoMensaje === "success" ? "green" : "red"
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "0 auto" }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>DNI:</label>
          <input
            style={inputStyle}
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="Ej: 12345678"
          />
        </div>
        <div>
          <label style={labelStyle}>Nombre:</label>
          <input
            style={inputStyle}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            backgroundColor: "#1E90FF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold"
          }}
        >
          Registrar
        </button>
      </form>
      {mensaje && <p style={mensajeStyle}>{mensaje}</p>}
    </div>
  );
}

export default Register;
