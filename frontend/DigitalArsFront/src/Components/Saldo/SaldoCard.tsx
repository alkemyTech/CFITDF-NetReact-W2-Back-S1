import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <Card sx={{ minWidth: 275, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Saldo Disponible
        </Typography>
        <Typography variant="h4" component="div" color="primary">
          ${saldo !== null ? saldo.toFixed(2) : 'Cargando...'}
        </Typography>
      </CardContent>
    </Card>
  );
}

