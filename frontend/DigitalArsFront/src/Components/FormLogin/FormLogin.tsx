import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
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
      const res = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Login fallido');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" justifyContent="center" minHeight="100vh">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" mb={2} align="center">DigitalArs</Typography>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMsg && <Typography color="error" variant="body2" mt={1}>{errorMsg}</Typography>}
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>Iniciar sesión</Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>Crear cuenta</Button>
        </Paper>
      </Box>
    </Container>
  );
}