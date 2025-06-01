import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleRegister = async () => {
        try {
            // Paso 1: crear usuario
            const resUser = await axios.post('/api/User', {
                NOMBRE: nombre,
                EMAIL: email,
                CREATION_DATE: new Date().toISOString(),
                PASS: password,
                ID_ROL: 2, // por defecto, rol de usuario
            });

            const userId = resUser.data.ID_USUARIO;

            // Paso 2: crear cuenta para ese usuario
            await axios.post('http://localhost:5056/api/Cuenta', {
                ID_USUARIO: userId,
                SALDO: 0,
                ALIAS: `${nombre.toLowerCase()}.digitalars`,
                CBU: Math.floor(Math.random() * 1e14).toString(),
            }, {

                withCredentials: true
            });

            setMensaje('Usuario registrado con éxito.');
            setTimeout(() => navigate('/'), 2000); // redirige al login
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const backendMessage = error.response.data?.errors
                    ? JSON.stringify(error.response.data.errors)
                    : error.response.data?.title || 'Error al crear cuenta';

                alert(`❌ ${backendMessage}`);
            } else {
                alert('❌ Error inesperado');
            }
          }
    };

    return (
        <Container maxWidth="xs">
            <Box display="flex" justifyContent="center" minHeight="100vh" alignItems="center">
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>Registro</Typography>
                    <TextField label="Nombre" fullWidth margin="normal" value={nombre} onChange={e => setNombre(e.target.value)} />
                    <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
                    {mensaje && <Typography mt={2} color="primary">{mensaje}</Typography>}
                    <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleRegister}>
                        Registrarse
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}