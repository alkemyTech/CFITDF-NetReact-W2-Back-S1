import { Box, Button, Container, Paper, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function FormLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', { Email: email, Password: password }, { withCredentials: true });
  
      const { token, usuario } = res.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        ID_USUARIO: usuario.ID_USUARIO,
        NOMBRE: usuario.NOMBRE,
        EMAIL: usuario.EMAIL,
        
      }));
  
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Login fallido');
    }
    
  };
  

  return (
    <Container maxWidth="xs" sx={{ fontFamily: `'Poppins', sans-serif` }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
        {/* Logo */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: '#1976d2',
            color: '#fff',
            fontSize: 36,
            fontWeight: 'bold',
            mb: 2
          }}
        >
          A
        </Box>

        <Typography variant="h5" fontWeight="bold" mb={3}>
          DIGITALARS
        </Typography>

        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMsg && (
            <Typography color="error" variant="body2" mt={1}>
              {errorMsg}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: 2,
              backgroundColor: '#1976d2',
              textTransform: 'none'
            }}
            onClick={handleLogin}
          >
            Iniciar sesión
          </Button>
          <Link
            underline="hover"
            variant="body2"
            align="center"
            display="block"
            sx={{ mt: 2, cursor: 'pointer' }}
            onClick={() => navigate('/forgot-password')}
          >
            ¿Olvidaste tu contraseña?
          </Link>
          <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate('/register')}>
            Crear cuenta
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}