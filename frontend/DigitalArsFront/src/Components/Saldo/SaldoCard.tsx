import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SendIcon from '@mui/icons-material/Send';
import SavingsIcon from '@mui/icons-material/Savings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext'
import InfoCuenta from '../InfoCuenta/InfoCuenta';
import DepositoModal from '../Dashboard/DepositoModal';

export default function SaldoCard() {
  const navigate = useNavigate();
  const { saldo } = useUserContext();
  const [openDeposito, setOpenDeposito] = useState(false);

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

        {/* Botones alineados */}
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap={2}
          mt={4}
          flexWrap="wrap"
        >
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            sx={{
              background: "#fff",
              color: "#1976d2",
              textTransform: "none",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
              px: 3,
              py: 1.5,
              minWidth: 160,
              transition: '0.2s',
              '&:hover': {
                background: "#e3f2fd",
                color: "#1565c0",
                boxShadow: '0 4px 14px rgba(25, 118, 210, 0.20)',
              }
            }}
            onClick={() => navigate("/dashboard/nueva_transaccion")}
          >
            Enviar dinero
          </Button>

          {/* Botón para ingresar dinero */}
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{
              background: "rgba(255,255,255,0.92)",
              color: "#1976d2",
              textTransform: "none",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 8,
              border: '2px solid #fff',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
              px: 3,
              py: 1.5,
              minWidth: 160,
              transition: '0.2s',
              '&:hover': {
                background: "#e3f2fd",
                color: "#1565c0",
                border: '2px solid #90caf9',
                boxShadow: '0 4px 14px rgba(25, 118, 210, 0.15)',
              }
            }}
            onClick={() => setOpenDeposito(true)}
          >
            Ingresar dinero
          </Button>

          <Button
            variant="contained"
            startIcon={<SavingsIcon />}
            sx={{
              background: "rgba(255,255,255,0.92)",
              color: "#1976d2",
              textTransform: "none",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 8,
              border: '2px solid #fff',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
              px: 3,
              py: 1.5,
              minWidth: 160,
              transition: '0.2s',
              '&:hover': {
                background: "#e3f2fd",
                color: "#1565c0",
                border: '2px solid #90caf9',
                boxShadow: '0 4px 14px rgba(25, 118, 210, 0.15)',
              }
            }}
            onClick={() => navigate("/dashboard/plazofijo/crear")}
          >
            Invertir ahora
          </Button>
        </Box>

        {/* MODAL para ingresar dinero */}
        <Dialog open={openDeposito} onClose={() => setOpenDeposito(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, color: "#1976d2" }}>Depositar Dinero</DialogTitle>
          <DialogContent>
            <DepositoModal onClose={() => setOpenDeposito(false)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeposito(false)} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

        {/* botón para compartir datos de cuenta */}
        <Box mt={3}>
          <InfoCuenta />
        </Box>
      </CardContent>
    </Card>
  );
}
