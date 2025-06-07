import { useState } from "react";
import { TextField, Button, Typography, Select, MenuItem } from "@mui/material";
import axios from "axios";

const DepositoModal = () => {
  
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("transferencia");
  const [aliasCbu, setAliasCbu] = useState("");
  const [tarjetaInfo, setTarjetaInfo] = useState({ numero: "", vencimiento: "", cvv: "" });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Obtener el ID del usuario correctamente desde el almacenamiento local
  const userData = localStorage.getItem("user");
  const usuarioId = userData ? JSON.parse(userData).ID_USUARIO : null;

  const handleMontoChange = (e: any) => setMonto(e.target.value);
  const handleMetodoChange = (e: any) => setMetodoPago(e.target.value);
  const handleAliasCbuChange = (e: any) => setAliasCbu(e.target.value);
  const handleTarjetaChange = (e: any) =>
    setTarjetaInfo({ ...tarjetaInfo, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    // Validaciones
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

  // 🔹 Si solo contiene números, validar que sean 22 dígitos (CBU)
  if (/^\d+$/.test(aliasCbu) && aliasCbu.length !== 22) {
    setError("El CBU debe tener exactamente 22 números.");
    return;
  }

  // 🔹 Si tiene letras o puntos, asumir que es un alias (puedes mejorar esta validación si lo deseas)
  if (!/^[a-zA-Z0-9.]+$/.test(aliasCbu)) {
    setError("El alias solo puede contener letras, números y puntos.");
    return;
  }
}


  if (metodoPago === "tarjeta") {
  // Verificar que se ingresaron todos los datos
  if (!tarjetaInfo.numero || !tarjetaInfo.vencimiento || !tarjetaInfo.cvv) {
    setError("Todos los campos de la tarjeta deben estar completos.");
    return;
  }

  // Validación de número de tarjeta: 16 dígitos numéricos
  if (!/^\d{16}$/.test(tarjetaInfo.numero)) {
    setError("El número de tarjeta debe contener exactamente 16 dígitos.");
    return;
  }

  // Validación de fecha de vencimiento: formato MM/YY
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(tarjetaInfo.vencimiento)) {
    setError("La fecha de vencimiento debe estar en formato MM/YY.");
    return;
  }

  // Validación del código de seguridad (CVV): 3 dígitos numéricos
  if (!/^\d{3}$/.test(tarjetaInfo.cvv)) {
    setError("El código de seguridad (CVV) debe contener exactamente 3 dígitos.");
    return;
  }
}


    const token = localStorage.getItem("token");
console.log("Usuario ID:", usuarioId);
console.log("Saldo a depositar:", monto);
console.log("Token:", token);

  try {
  const response = await axios.post(
    "http://localhost:5056/api/Cuenta/Depositar", // Cambia 'depositar' por 'Depositar'
    { ID_USUARIO: usuarioId, SALDO: monto }, // Asegura que 'saldo' es el campo esperado en el backend
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setMensaje("Depósito realizado con éxito.");
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
          <MenuItem value="paypal">PayPal</MenuItem>
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
      {mensaje && <Typography variant="h6" color="success">{mensaje}</Typography>}
    </div>
  );
};

export default DepositoModal;