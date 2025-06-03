import {
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SendIcon from '@mui/icons-material/Send';
import SavingsIcon from '@mui/icons-material/Savings';
import { useUserContext } from '../../Context/UserContext'

export default function SaldoCard() {
  const navigate = useNavigate();
  const { saldo } = useUserContext(); // obtengo saldo del contexto global

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: '#fff',
        boxShadow: 4,
        p: 2,
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        mt: 4
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Saldo Disponible
          </Typography>
          <AccountBalanceWalletIcon fontSize="large" />
        </Box>

        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', mt: 2 }}
        >
          {typeof saldo === "number"
            ? saldo.toLocaleString("es-AR", { style: "currency", currency: "ARS" })
            : "Cargando..."}
        </Typography>

        <Box display="flex" justifyContent="flex-start" gap={2} mt={3} flexWrap="wrap">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              fontWeight: 600,
              minWidth: 150,
              backgroundColor: "#fff",
              color: "#1976d2",
              '&:hover': {
                backgroundColor: '#e3f2fd',
              }
            }}
            onClick={() => navigate("/dashboard/nueva_transaccion")}
          >
            Enviar dinero
          </Button>

          <Button
            variant="outlined"
            endIcon={<SavingsIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              fontWeight: 600,
              minWidth: 150,
              color: "#fff",
              borderColor: "#fff",
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
            onClick={() => navigate("/dashboard/plazofijo/crear")}
          >
            Invertir ahora
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
