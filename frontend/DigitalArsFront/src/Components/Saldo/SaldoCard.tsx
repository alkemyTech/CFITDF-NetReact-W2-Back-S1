import { Card, CardContent, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { teal } from '@mui/material/colors';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"

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
      
              if (!userId){
                  console.error(" la ID del usuario no esta disponible.");
                  return;
              }
      
              const response = await axios.get(`http://localhost:5056/api/cuenta/id/${userId}`, {
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
    <Card sx={{ backgroundColor: teal[600], py: "20px", mb: 5 }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AccountBalanceWalletIcon
            sx={{ color: teal[200], fontSize: "6em" }}
            fontSize="inherit"
          />
          <Container sx={{ textAlign: "start" }}>
            <Typography variant="h5" color="white">
              Saldo Disponible
            </Typography>
            <Typography variant="h3" color="white">
              {saldo !== null ? saldo.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              }) : (0).toLocaleString("es-AR", {
                style: "currency",
                minimumIntegerDigits: 3,
                currency: "ARS",
              }).replace(/0/g, " - ")}
            </Typography>
          </Container>
        </CardContent>
      </Card>
  );
}

