import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Card, CardContent, Typography, Grid, Box, Divider } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";

type PlazoFijo = {
    Monto: number;
    PlazoDias: number;
    TasaInteres: number;
    FechaInicio: string;
    FechaVencimiento: string;
    InteresGenerado: number;
    MontoFinal: number;
    Estado: string;
};

export default function BoxPlazoFijo() {
    const [plazosFijos, setPlazosFijos] = useState<PlazoFijo[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const decoded: any = jwtDecode(token);
            const usuarioId = parseInt(decoded.sub || "0");

            axios
                .get(`/api/PlazoFijo/usuario/${usuarioId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => setPlazosFijos(res.data))
                .catch((err) => console.error("Error:", err));
        }
    }, []);

    return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
            {plazosFijos.length === 0 ? (
                <Typography variant="body1" sx={{ m: 2 }}>
                    No hay plazos fijos activos.
                </Typography>
            ) : (
                plazosFijos.map((pf, index) => {
                    const montoFinal = pf.Monto + pf.InteresGenerado;

                    return (
                        <Grid item xs={12} md={6} key={index}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    background: "#f5f5f5",
                                    boxShadow: 3,
                                    p: 2,
                                }}
                            >
                                <CardContent>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <TimelineIcon color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="h6" fontWeight={600}>
                                            Plazo Fijo #{index + 1}
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    <Typography variant="body1" gutterBottom>
                                        <strong>Monto:</strong> ${pf.Monto.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Tasa de interés:</strong> {pf.TasaInteres}%
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Fecha de inicio:</strong> {new Date(pf.FechaInicio).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Fecha de vencimiento:</strong> {new Date(pf.FechaVencimiento).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Interés generado:</strong> ${pf.InteresGenerado.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Monto total con interés:</strong> ${montoFinal.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body1" color={pf.Estado === "Activo" ? "green" : "text.secondary"}>
                                        <strong>Estado:</strong> {pf.Estado}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })
            )}
        </Grid>
    );
}
