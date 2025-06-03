import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Divider,
    CircularProgress,
    LinearProgress,
    Chip
} from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";

// Tipo de dato para los plazos fijos
interface PlazoFijo {
    Monto: number;
    PlazoDias: number;
    TasaInteres: number;
    FechaInicio: string;
    FechaVencimiento: string;
    InteresGenerado: number;
    MontoFinal: number;
    Estado: string;
}

export default function BoxPlazoFijo() {
    const [plazosFijos, setPlazosFijos] = useState<PlazoFijo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchPlazosFijos = async () => {
            if (!token) return;
            try {
                const decoded: any = jwtDecode(token);
                const usuarioId = parseInt(decoded.sub || "0");
                const res = await axios.get(`/api/PlazoFijo/usuario/${usuarioId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPlazosFijos(res.data);
            } catch (err) {
                console.error("Error al obtener plazos fijos:", err);
                setError("No se pudieron cargar los plazos fijos.");
            } finally {
                setLoading(false);
            }
        };
        fetchPlazosFijos();
    }, []);

    const calcularProgreso = (inicio: string, vencimiento: string) => {
        const fechaInicio = new Date(inicio).getTime();
        const fechaFin = new Date(vencimiento).getTime();
        const hoy = Date.now();
        const total = fechaFin - fechaInicio;
        const transcurrido = hoy - fechaInicio;
        return Math.min((transcurrido / total) * 100, 100);
    };

    return (
        <Grid container spacing={3} sx={{ mt: 4 }}>
            {loading ? (
                <Box sx={{ m: 2, display: "flex", alignItems: "center" }}>
                    <CircularProgress size={24} sx={{ mr: 2 }} />
                    <Typography>Cargando plazos fijos...</Typography>
                </Box>
            ) : error ? (
                <Typography color="error" sx={{ m: 2 }}>{error}</Typography>
            ) : plazosFijos.length === 0 ? (
                <Typography sx={{ m: 2 }}>No tenés plazos fijos activos.</Typography>
            ) : (
                plazosFijos.map((pf, index) => {
                    const progreso = calcularProgreso(pf.FechaInicio, pf.FechaVencimiento);
                    const montoFinal = pf.Monto + pf.InteresGenerado;

                    return (
                        <Grid item xs={12} md={6} key={index}>
                            <Card sx={{ borderRadius: 4, boxShadow: 3, p: 2 }}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <TimelineIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="h6" fontWeight={600}>
                                            Plazo Fijo #{index + 1}
                                        </Typography>
                                        <Chip
                                            label={pf.Estado}
                                            color={pf.Estado === "Activo" ? "success" : "default"}
                                            size="small"
                                            sx={{ ml: 2 }}
                                        />
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    <Typography gutterBottom><strong>Monto:</strong> ${pf.Monto.toFixed(2)}</Typography>
                                    <Typography gutterBottom><strong>Tasa de interés:</strong> {pf.TasaInteres}%</Typography>
                                    <Typography gutterBottom><strong>Inicio:</strong> {new Date(pf.FechaInicio).toLocaleDateString()}</Typography>
                                    <Typography gutterBottom><strong>Vencimiento:</strong> {new Date(pf.FechaVencimiento).toLocaleDateString()}</Typography>
                                    <Typography gutterBottom><strong>Interés generado:</strong> ${pf.InteresGenerado.toFixed(2)}</Typography>
                                    <Typography gutterBottom><strong>Total al vencimiento:</strong> ${montoFinal.toFixed(2)}</Typography>

                                    <Box mt={2}>
                                        <Typography variant="body2" gutterBottom>
                                            Progreso del Plazo Fijo
                                        </Typography>
                                        <LinearProgress variant="determinate" value={progreso} sx={{ height: 10, borderRadius: 5 }} />
                                        <Typography variant="caption">{progreso.toFixed(0)}%</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })
            )}
        </Grid>
    );
}
