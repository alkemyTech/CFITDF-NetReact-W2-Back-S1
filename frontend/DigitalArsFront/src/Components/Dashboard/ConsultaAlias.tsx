import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const ConsultaAlias = () => {
  const [alias, setAlias] = useState("");
  const [titular, setTitular] = useState(null);
const [nombreUsuario, setNombreUsuario] = useState(null); // Nuevo estado para el nombre

  const handleChange = (e) => {
    setAlias(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


  const token = localStorage.getItem("token"); // Recupera el token si la API lo requiere

  try {
    const aliasResponse = await axios.get(`http://localhost:5056/api/cuenta/alias/${alias}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const id = aliasResponse.data.iD_USUARIO;

    if (!id) {
      setTitular("Alias encontrado, pero no tiene un ID de usuario asociado");
      return;
    }

    console.log("ID Usuario obtenido:", id);
    setTitular(id);

    // Obtén el nombre del usuario con el ID_USUARIO
    const usuarioResponse = await axios.get(`http://localhost:5056/api/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setNombreUsuario(usuarioResponse.data.nombre || "Usuario sin nombre registrado");

  } catch (error) {
    console.error("Error al obtener los datos:", error);
    setTitular("Error al obtener los datos");
}

  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <Typography variant="h5">Ingrese Alias destino</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TextField label="Alias" name="alias" value={alias} onChange={handleChange} required />
       
        <Button type="submit" variant="contained">Buscar</Button>
      </form>
      {titular && <Typography variant="h6">Titular: {titular}</Typography>}
      {nombreUsuario && <Typography variant="h6">Nombre: {nombreUsuario}</Typography>}
       
    </div>
  );
};

export default ConsultaAlias;
