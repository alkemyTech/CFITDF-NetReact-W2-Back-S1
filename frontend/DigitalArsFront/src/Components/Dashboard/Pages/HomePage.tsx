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
import SaldoCard from "@/Components/Saldo/SaldoCard";
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../../Context/UserContext'; 
import TransaccionesPage from "./TransaccionesPage";


export default function InicioPage() {
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

        <Box>
          <TransaccionesPage standalone={false}/>
        </Box>

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
