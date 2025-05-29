import React, { useState } from "react";
import { db } from "./firebase/firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

function App() {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [user, setUser] = useState(null); // usuario logueado
  const [mensaje, setMensaje] = useState("");
  const [modo, setModo] = useState("login"); // "login" o "registro"

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (!dni || !nombre) {
      setMensaje("Completa DNI y nombre");
      return;
    }

    try {
      const docRef = doc(db, "usuarios", dni);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMensaje("El DNI ya está registrado");
        return;
      }

      await setDoc(docRef, { nombre });
      setMensaje("Usuario registrado. Ahora podés loguearte");
      setModo("login");
      setDni("");
      setNombre("");
    } catch (error) {
      setMensaje("Error: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!dni) {
      setMensaje("Ingrese DNI para loguearse");
      return;
    }

    try {
      const docRef = doc(db, "usuarios", dni);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setMensaje("DNI no registrado");
        return;
      }

      setUser({ dni, nombre: docSnap.data().nombre });
      setMensaje("");
      setDni("");
    } catch (error) {
      setMensaje("Error: " + error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMensaje("");
  };

  if (user) {
    return (
      <div>
        <h2>Bienvenido, {user.nombre}!</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{modo === "login" ? "Login" : "Registro"}</h1>
      {modo === "login" ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <button type="submit">Ingresar</button>
          <p>
            ¿No tenés cuenta?{" "}
            <button onClick={() => setModo("registro")}>Registrate</button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button type="submit">Registrar</button>
          <p>
            ¿Ya tenés cuenta?{" "}
            <button onClick={() => setModo("login")}>Ingresar</button>
          </p>
        </form>
      )}
      <p>{mensaje}</p>
    </div>
  );
}

export default App;
