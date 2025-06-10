import { Box, Button, Container, Paper, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../Context/UserContext';

export default function FormLogin() {
  const { setUsuario, recargarSaldo } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { Email: email, Password: password },
        { withCredentials: true }
      );

      const { token, usuario } = res.data;

      // Declara userData 
      const userData = {
        ID_USUARIO: usuario.ID_USUARIO,
        NOMBRE: usuario.NOMBRE,
        EMAIL: usuario.EMAIL,
        ID_ROL: usuario.ID_ROL,
        NOMBRE_ROL: usuario.NOMBRE_ROL
      };

      // Guarda el token y el usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Actualiza el contexto global
      setUsuario(userData);

      // Actualiza el saldo del usuario logueado
      recargarSaldo();

      //  Navega al dashboard
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Login fallido');
    }
  };

  return (
    <>
    
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', minHeight: '100vh', p: 0 }}>
      {/* Imagen a la izquierda */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: '#f5f5f5',
        }}
      >
        <img
          src="/pagos.jpg"
          alt="Pagos"
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: 16,
            boxShadow: '0px 4px 20px rgb(0, 0, 0)',
          }}
        />
      </Box>
      {/* Formulario a la derecha */}
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        {/* El container original del formulario irá aquí */}
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
                mb: 2,
              }}
            >
              A
            </Box>

            <Typography variant="h5" fontWeight="bold" mb={1}>
              DIGITALARS
            </Typography>

            <Typography variant="h6" mb={2}>
              Pagá fácil, viví mejor
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
                  textTransform: 'none',
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
      </Box>
    </Container>
    </>
  );
}