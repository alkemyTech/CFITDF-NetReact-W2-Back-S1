import { useState } from "react";
import { TextField, Button, Typography, Select, MenuItem } from "@mui/material";
import axios from "axios";

interface DepositoModalProps {
  onClose: () => void;
}

const DepositoModal = ({ onClose }: DepositoModalProps) => {
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("transferencia");
  const [aliasCbu, setAliasCbu] = useState("");
  const [tarjetaInfo, setTarjetaInfo] = useState({ numero: "", vencimiento: "", cvv: "" });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const userData = localStorage.getItem("user");
  const usuarioId = userData ? JSON.parse(userData).ID_USUARIO : null;

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => setMonto(e.target.value);
  const handleMetodoChange = (e: any) => setMetodoPago(e.target.value); // Podés tipar mejor si lo deseas
  const handleAliasCbuChange = (e: React.ChangeEvent<HTMLInputElement>) => setAliasCbu(e.target.value);
  const handleTarjetaChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTarjetaInfo({ ...tarjetaInfo, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!usuarioId) {
      setError("No se pudo obtener el ID del usuario.");
      return;
    }
    if (isNaN(Number(monto)) || Number(monto) <= 0) {
      setError("El monto debe ser un número válido mayor a 0.");
      return;
    }
    if (metodoPago === "transferencia") {
      if (!aliasCbu.trim()) {
        setError("Debes ingresar un Alias o CBU.");
        return;
      }
      if (/^\d+$/.test(aliasCbu) && aliasCbu.length !== 22) {
        setError("El CBU debe tener exactamente 22 números.");
        return;
      }
      if (!/^[a-zA-Z0-9.]+$/.test(aliasCbu)) {
        setError("El alias solo puede contener letras, números y puntos.");
        return;
      }
    }
    if (metodoPago === "tarjeta") {
      if (!tarjetaInfo.numero || !tarjetaInfo.vencimiento || !tarjetaInfo.cvv) {
        setError("Todos los campos de la tarjeta deben estar completos.");
        return;
      }
      if (!/^\d{16}$/.test(tarjetaInfo.numero)) {
        setError("El número de tarjeta debe contener exactamente 16 dígitos.");
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(tarjetaInfo.vencimiento)) {
        setError("La fecha de vencimiento debe estar en formato MM/YY.");
        return;
      }
      if (!/^\d{3}$/.test(tarjetaInfo.cvv)) {
        setError("El código de seguridad (CVV) debe contener exactamente 3 dígitos.");
        return;
      }
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/Cuenta/Depositar",
        { ID_USUARIO: usuarioId, SALDO: monto },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMensaje("Depósito realizado con éxito.");
      setTimeout(() => {
        setMensaje("");
        onClose();
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Error al procesar el depósito.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <Typography variant="h5">Depositar Dinero</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <TextField label="Monto" name="monto" value={monto} onChange={handleMontoChange} required />
        <Select value={metodoPago} onChange={handleMetodoChange}>
          <MenuItem value="transferencia">Transferencia Bancaria</MenuItem>
          <MenuItem value="tarjeta">Tarjeta de Crédito/Débito</MenuItem>
          <MenuItem value="paypal" disabled>PayPal</MenuItem>
        </Select>
        {metodoPago === "transferencia" && (
          <TextField label="Alias o CBU" name="aliasCbu" value={aliasCbu} onChange={handleAliasCbuChange} required />
        )}
        {metodoPago === "tarjeta" && (
          <>
            <TextField label="Número de Tarjeta" name="numero" value={tarjetaInfo.numero} onChange={handleTarjetaChange} required />
            <TextField label="Fecha de Vencimiento (MM/YY)" name="vencimiento" value={tarjetaInfo.vencimiento} onChange={handleTarjetaChange} required />
            <TextField label="Código de Seguridad (CVV)" name="cvv" value={tarjetaInfo.cvv} onChange={handleTarjetaChange} required />
          </>
        )}
        <Button type="submit" variant="contained">Depositar</Button>
      </form>
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      {mensaje && <Typography variant="h6" sx={{ color: "green" }}>{mensaje}</Typography>}
    </div>
  );
};

export default DepositoModal;
