import { useState, useEffect } from "react";
import {
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper,
    Alert,
    InputAdornment,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Estructura del payload del token JWT
type TokenPayload = {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    exp: number;
    sub: string; // ID del usuario
};

export default function CrearPlazoFijo() {
    const [monto, setMonto] = useState("");
    const [plazo, setPlazo] = useState<number | "">("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [usuarioId, setUsuarioId] = useState<number>(0);
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<TokenPayload>(token);
                const id = parseInt(decoded.sub);
                console.log("ID del usuario desde claim:", id);
                setUsuarioId(id);
            } catch (e) {
                console.error("Error al decodificar el token:", e);
                setError("Token inválido.");
            }
        } else {
            setError("No se encontró el token.");
        }
    }, []);

    const handleCrear = async () => {
        setMensaje("");
        setError("");
        console.log("usuarioId:", usuarioId);
        console.log("monto:", monto);
        console.log("plazo:", plazo);

        if (!usuarioId || monto.trim() === "" || plazo === "") {
            setError("Completa todos los campos.");
            return;
        }

        const dto = {
            Monto: parseFloat(monto),
            Plazo: plazo,
            Fecha_Inicio: new Date().toISOString(),
            UsuarioId: usuarioId,
        };

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API_URL}/api/PlazoFijo/Crear`, dto, {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },

            });
            console.log("Respuesta del backend:", response.data);
            setMensaje("Plazo fijo creado correctamente");
            setMonto("");
            setPlazo("");
        } catch (err: any) {
            console.error("Error en axios:", err.response?.data || err.message);

            // Muestra mensaje específico si viene del backend
            if (err.response?.data && typeof err.response.data === "string") {
                setError(err.response.data);
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Error al crear el plazo fijo.");
            }
        }
    };

    return (
        <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Crear Plazo Fijo
            </Typography>

            <TextField
                id="monto"
                label="Monto a invertir"
                type="number"
                fullWidth
                margin="normal"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                        ),
                    },
                }}
            />

            <TextField
                id="plazo"
                label="Plazo en días"
                select
                fullWidth
                margin="normal"
                value={plazo}
                onChange={(e) => setPlazo(parseInt(e.target.value))}
            >
                <MenuItem value={30}>30 días</MenuItem>
                <MenuItem value={60}>60 días</MenuItem>
                <MenuItem value={90}>90 días</MenuItem>
            </TextField>

            <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={handleCrear}
                sx={{ mt: 2 }}
            >
                Confirmar
            </Button>

            {mensaje && <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Paper>
    );
}
