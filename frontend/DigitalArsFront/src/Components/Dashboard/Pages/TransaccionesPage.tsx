import { PageContainer } from "@toolpad/core";
import {
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
import { useEffect, useState } from "react";
import axios from "axios";

interface Transaccion {
  ID_TRANSACCION: number;
  FECHA: Date; // Aseguramos que la fecha sea un objeto Date
  MONTO: number;
}

interface Props {
  standalone?: boolean;
}


export default function TransaccionesPage({standalone = true}: Props) {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);

  useEffect(() => {
    const fetchTransacciones = async () =>{
      try {
        const token = localStorage.getItem('token');
        const response =await axios.get<Transaccion[]>(
          'http://localhost:5056/api/transaccion/cuentas',{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const datos = response.data.map(t => ({
          ...t,
          FECHA: new Date(t.FECHA), // Aseguramos que la fecha sea un objeto Date
        }));
        console.log("Transacciones obtenidas:", datos);
        setTransacciones(datos);
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
      }  
    };
    fetchTransacciones();
  }, []);

  // Si standalone es false, mostramos solo las primeras 3 transacciones
  const transaccionesFiltradas = standalone ? transacciones : transacciones.slice(0, 3);

  const content =(
     <Box mt={6}>  
              {standalone && (
        <Typography variant="h5" sx={{mb:2, fontWeight:600}}>
          Ultimas Transacciones
        </Typography>   
      )}  
        {transaccionesFiltradas.length === 0 ? (
          <Typography sx={{ mt: 2, fontStyle: "italic", color: "gray" }}>
            No hay transacciones disponibles.
          </Typography>
        ) : (
        <TableContainer component={Paper} >
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaccionesFiltradas.map((row) => (
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
        )} 
      </Box>
    );

    // si standalone es false, devolvemos solo el contenido en un Container
  return standalone ? <PageContainer>{content}</PageContainer>: content;
}