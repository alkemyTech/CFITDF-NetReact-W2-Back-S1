import { useState, type ChangeEvent, type FormEvent } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useUserContext } from '../../Context/UserContext';

interface TransaccionFormularioProps {
  id_cuenta_destino: number;
  id_cuenta_origen: number;
}

const TransaccionFormulario: React.FC<TransaccionFormularioProps> = ({ id_cuenta_destino, id_cuenta_origen }) => {
  const [monto, setMonto] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMonto(Number(e.target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem("token");
    const fecha = new Date().toISOString();

    try {
      await axios.post(
        `${API_URL}/api/transaccion`,
        {
          ID_CUENTA_ORIGEN: id_cuenta_origen,
          ID_CUENTA_DESTINO: id_cuenta_destino,
          MONTO: monto,
          FECHA: fecha,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(true);
    } catch (err: any) {
      console.error("Error al obtener los datos:", error);
      if (err.response) {
          // El servidor respondió con un error (código 4xx o 5xx)
          console.error('Mensaje del backend:', err.response.data.message);
          setError(err.response.data.message);
      } else if (err.request) {
          // La solicitud se hizo pero no hubo respuesta
          console.error('No hubo respuesta del servidor');
      } else {
          // Error en la configuración de la solicitud
          console.error('Error', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
      <TextField
        label="Monto"
        type="number"
        value={monto}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">Transacción realizada con éxito</Typography>}
    </form>
  );
};

const TransaccionModal = () => {
  const [alias, setAlias] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const [confirm, setConfirm] = useState(false);
  const { cuenta } = useUserContext();

  const handleChange = (e: any) => {
    setAlias(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setConfirm(false);

    const isOnlyNumbers = (str: string) => /^\d+$/.test(str);

    const token = localStorage.getItem("token"); // Recupera el token si la API lo requiere
    try {
      const aliasResponse = await axios.get(isOnlyNumbers(alias) ? `${API_URL}/api/cuenta/cbu/${alias}` : `${API_URL}/api/cuenta/alias/${alias}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const id = aliasResponse.data.ID_CUENTA;
    
      if (!id) {
        setError("Alias encontrado, pero no tiene un ID de usuario asociado");
        return;
      }

      console.log(aliasResponse.data)
      
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
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <Typography variant="h5">Ingrese Alias destino</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TextField label="Alias" name="alias" value={alias} onChange={handleChange} required />
       
        <Button type="submit" variant="contained">Buscar</Button>
      </form>

      {error && <Typography variant="h6" color="error">{error}</Typography>}

      {data != null && confirm == false ?
        <>
          <Typography variant="h6">Titular: {data.ID_CUENTA ? data.ID_CUENTA : "No id"}</Typography>
          <Typography variant="h6">Nombre: {data.NOMBRE ? data.NOMBRE : "No name"}</Typography>
          
          {confirm ? null : <Button onClick={() => setConfirm(true)}>Confirmar Cuenta</Button>}
        </> : null
      }

      {confirm && cuenta?.ID_CUENTA
        ? <TransaccionFormulario
          id_cuenta_destino={data.ID_CUENTA}
          id_cuenta_origen={cuenta.ID_CUENTA}
        /> : null}
    </Box>
  );
};

export default TransaccionModal;
