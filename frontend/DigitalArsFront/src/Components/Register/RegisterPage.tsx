import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Container, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const handleRegister = async () => {
        try {
            const resUser = await axios.post(`${API_URL}/api/User/register`, {
                NOMBRE: nombre,
                EMAIL: email,
                CREATION_DATE: new Date().toISOString(),
                PASS: password,
                ID_ROL: 2,
            });

            console.log("📥 Respuesta del backend:", resUser.data);

            const userId = resUser.data.ID_USUARIO;
            if (!userId) {
                alert("⚠️ No se recibió ID del usuario desde el backend.");
                return;
            }

            await axios.post(`${API_URL}/api/Cuenta`, {
                ID_USUARIO: userId,
                SALDO: 0,
                ALIAS: `${nombre.toLowerCase()}.digitalars`,
                CBU: Math.floor(Math.random() * 1e14).toString(),
            }, {
                withCredentials: true
            });

            setMensaje('Usuario registrado con éxito.');
            setTimeout(() => navigate('/'), 2000);
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
                        label="Nombre"
                        fullWidth
                        margin="normal"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {mensaje && (
                        <Typography mt={2} color="primary">
                            {mensaje}
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
                        onClick={handleRegister}
                    >
                        Registrarse
                    </Button>
                    <Link
                        underline="hover"
                        variant="body2"
                        align="center"
                        display="block"
                        sx={{ mt: 2, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        ¿Ya tienes cuenta? Inicia sesión
                    </Link>
                </Paper>
            </Box>
        </Container>
    );
}
