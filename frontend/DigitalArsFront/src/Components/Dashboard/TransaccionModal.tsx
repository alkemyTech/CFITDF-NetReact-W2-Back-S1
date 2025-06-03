import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const TransaccionModal = () => {
  const [alias, setAlias] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setAlias(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isOnlyNumbers = (str: string) => /^\d+$/.test(str);

    const token = localStorage.getItem("token"); // Recupera el token si la API lo requiere
    try {
      const aliasResponse = await axios.get(isOnlyNumbers(alias) ? `http://localhost:5056/api/cuenta/cbu/${alias}` : `http://localhost:5056/api/cuenta/alias/${alias}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const id = aliasResponse.data.ID_CUENTA;
    
      if (!id) {
        setError("Alias encontrado, pero no tiene un ID de usuario asociado");
        return;
      }
      
      console.log("ID Usuario obtenido:", id);
      setData(aliasResponse.data);
      setError(null); // Limpia el error si la solicitud fue exitosa
    } catch (error: any) {
      console.error("Error al obtener los datos:", error);
      setData(null);
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
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <Typography variant="h5">Ingrese Alias destino</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TextField label="Alias" name="alias" value={alias} onChange={handleChange} required />
       
        <Button type="submit" variant="contained">Buscar</Button>
      </form>

      {error && <Typography variant="h6" color="error">{error}</Typography>}

      {data != null ?
        <>
          <Typography variant="h6">Titular: {data.ID_CUENTA ? data.ID_CUENTA : "No id"}</Typography>
          <Typography variant="h6">Nombre: {data.NOMBRE ? data.NOMBRE : "No name"}</Typography>
          <Button>Confirmar Cuenta</Button>
        </> : null
      }
    </div>
  );
};

export default TransaccionModal;
