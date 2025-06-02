import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const ConsultaAlias = () => {
  const [alias, setAlias] = useState("");
  const [titular, setTitular] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState(null); // Nuevo estado para el nombre 
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e) => {
    setAlias(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Recupera el token si la API lo requiere

    const isOnlyNumbers = (str: string) => /^\d+$/.test(str);

    if (isOnlyNumbers(alias)) {
      try {
        const aliasResponse = await axios.get(`http://localhost:5056/api/cuenta/cbu/${alias}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        const id = aliasResponse.data.ID_CUENTA;
    
        if (!id) {
          setError("Alias encontrado, pero no tiene un ID de usuario asociado");
          return;
        }
    
        console.log("ID Usuario obtenido:", id);
        setTitular(id);
        setError(null); // Limpia el error si la solicitud fue exitosa
    
        // Obtén el nombre del usuario con el ID_USUARIO
        const usuarioResponse = await axios.get(`http://localhost:5056/api/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        setNombreUsuario(usuarioResponse.data.NOMBRE || "Usuario sin nombre registrado");
    
      } catch (error: any) {
        console.error("Error al obtener los datos:", error);
        setTitular(null);
        setNombreUsuario(null);
        if (error.response) {
            // El servidor respondió con un error (código 4xx o 5xx)
            console.error('Mensaje del backend:', error.response.data.message);
            setError(error.response.data.message);
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            console.error('No hubo respuesta del servidor');
        } else {
            // Error en la configuración de la solicitud
            console.error('Error', error.message);
        }
      }
    }
    else{
      try {
        const aliasResponse = await axios.get(`http://localhost:5056/api/cuenta/alias/${alias}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        const id = aliasResponse.data.ID_CUENTA;
    
        if (!id) {
          setError("Alias encontrado, pero no tiene un ID de usuario asociado");
          return;
        }
    
        console.log("ID Usuario obtenido:", id);
        setTitular(id);
        setError(null); // Limpia el error si la solicitud fue exitosa
    
        // Obtén el nombre del usuario con el ID_USUARIO
        const usuarioResponse = await axios.get(`http://localhost:5056/api/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        setNombreUsuario(usuarioResponse.data.NOMBRE || "Usuario sin nombre registrado");
    
      } catch (error: any) {
        console.error("Error al obtener los datos:", error);
        setTitular(null);
        setNombreUsuario(null);
        if (error.response) {
            // El servidor respondió con un error (código 4xx o 5xx)
            console.error('Mensaje del backend:', error.response.data.message);
            setError(error.response.data.message);
        } else if (error.request) {
            // La solicitud se hizo pero no hubo respuesta
            console.error('No hubo respuesta del servidor');
        } else {
            // Error en la configuración de la solicitud
            console.error('Error', error.message);
        }
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <Typography variant="h5">Ingrese Alias destino</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TextField label="Alias" name="alias" value={alias} onChange={handleChange} required />
       
        <Button type="submit" variant="contained">Buscar</Button>
      </form>

      {error && <Typography variant="h6" color="error">{error}</Typography>}

      {titular != null && nombreUsuario != null ?
        <>
          <Typography variant="h6">Titular: {titular}</Typography>
          <Typography variant="h6">Nombre: {nombreUsuario}</Typography>
        </> : null}
    </div>
  );
};

export default ConsultaAlias;
