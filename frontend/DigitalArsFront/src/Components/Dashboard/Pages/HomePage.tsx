import {
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { PageContainer } from "@toolpad/core";
import type { Transaction } from "../../../types";
import { useState } from "react";
import SaldoCard from "@/Components/Saldo/SaldoCard";
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../../Context/UserContext'; 

const testTransactions: Transaction[] = [
  {
    ID_TRANSACCION: 1,
    ID_CUENTA_ORIGEN: 1,
    ID_CUENTA_DESTINO: 2,
    FECHA: new Date(),
    MONTO: 10000,
  },
  {
    ID_TRANSACCION: 2,
    ID_CUENTA_ORIGEN: 1,
    ID_CUENTA_DESTINO: 2,
    FECHA: new Date(),
    MONTO: 5250,
  },
  {
    ID_TRANSACCION: 3,
    ID_CUENTA_ORIGEN: 1,
    ID_CUENTA_DESTINO: 2,
    FECHA: new Date(),
    MONTO: 8300,
  },
];

export default function InicioPage() {
  const [transacciones] = useState(testTransactions);
  const navigate = useNavigate();
  const { usuario } = useUserContext(); // ✅ Traemos el usuario desde el contexto

  return (
    <PageContainer
      title={`Hola, ${usuario?.NOMBRE ?? 'Usuario'}!`} // ✅ Saludo dinámico
      breadcrumbs={[]}
      maxWidth="md"
      sx={{ textAlign: "start", mt: 4 }}
    >
      <SaldoCard />



      <Box mt={6}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Transacciones Recientes
        </Typography>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transacciones.map((row) => (
                <TableRow key={row.ID_TRANSACCION}>
                  <TableCell>
                    {row.FECHA.toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {row.MONTO.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={2} textAlign="center">
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard/transacciones")}
            sx={{
              mt: 2,
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 500,
            }}
          >
            Ver todas las transacciones
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
}
