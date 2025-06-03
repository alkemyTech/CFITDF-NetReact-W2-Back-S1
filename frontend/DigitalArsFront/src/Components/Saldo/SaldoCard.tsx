import { Card, CardContent, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function SaldoCard() {
  const [saldo, setSaldo] = useState<number | null>(null);

  useEffect(() => {
    const fetchSaldo = async () => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!user || !token) return;

      try {
        const usuario = JSON.parse(user);
        const userId = usuario.ID_USUARIO;

        if (!userId) {
          console.error("La ID del usuario no está disponible.");
          return;
        }

        const response = await axios.get(`http://localhost:5056/api/cuenta/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setSaldo(response.data.SALDO);
      } catch (error) {
        console.error("Error al obtener saldo:", error);
      }
    };

    fetchSaldo();
  }, []);

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: '#fff',
        boxShadow: 4,
        p: 2
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
          {saldo !== null ? saldo.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              }) : (0).toLocaleString("es-AR", {
                style: "currency",
                minimumIntegerDigits: 3,
                currency: "ARS",
              }).replace(/0/g, " - ")}
        </Typography>
      </CardContent>
    </Card>
  );
}
