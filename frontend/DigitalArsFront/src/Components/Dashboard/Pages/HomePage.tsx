import {
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PageContainer } from "@toolpad/core";
import type { Transaction } from "../../../types";
import { useState } from "react";
import SaldoCard from '@/Components/Saldo/SaldoCard';

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
  const [transacctions, setTransacctions] = useState(testTransactions);
  return (
    <PageContainer
      title="Dashboard"
      breadcrumbs={[]}
      maxWidth="md"
      sx={{ textAlign: "start" }}
    >
      <SaldoCard/>
      <Typography variant="h4" sx={{mb: 4}}>Transacciones Recientes</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transacctions.map((row) => (
              <TableRow key={row.ID_TRANSACCION}>
                <TableCell>
                  {row.FECHA.toLocaleDateString("es-AR", {
                    dateStyle: "short",
                  })}
                </TableCell>
                <TableCell>{row.MONTO}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
}
