import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Tooltip,
    IconButton,
    Snackbar,
    Alert,
    Slide
} from '@mui/material';
import { useUserContext } from '../../Context/UserContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import type { TransitionProps } from '@mui/material/transitions';

// Animación Slide
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InfoCuenta: React.FC = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { usuario, cuenta } = useUserContext();

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const copiar = (texto: string, etiqueta: string) => {
        navigator.clipboard.writeText(texto);
        setSnackbarMessage(`${etiqueta} copiado al portapapeles`);
        setSnackbarOpen(true);
    };

    // Mostrar mensaje mientras se cargan los datos
    if (!usuario || !cuenta) {
        return (
            <Typography variant="body1" sx={{ mt: 2 }}>
                Cargando datos de la cuenta...
            </Typography>
        );
    }

    return (
        <>
            <Button
                variant="contained"
                startIcon={<ShareIcon />}
                sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    fontWeight: 600,
                    color: "#fff",
                    backgroundColor: "#1976d2",
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
                    '&:hover': {
                        backgroundColor: '#115293',
                    },
                }}
                onClick={handleDialogOpen}
            >
                Compartir cuenta
            </Button>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                TransitionComponent={Transition}
            >
                <DialogTitle>Datos de la Cuenta</DialogTitle>
                <DialogContent dividers>
                    <Typography display="flex" alignItems="center" gutterBottom>
                        <strong style={{ marginRight: 8 }}>Titular:</strong> {usuario.NOMBRE}
                        <Tooltip title="Copiar nombre">
                            <IconButton onClick={() => copiar(usuario.NOMBRE, 'Nombre')}>
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Typography display="flex" alignItems="center" gutterBottom>
                        <strong style={{ marginRight: 8 }}>Alias:</strong> {cuenta.ALIAS}
                        <Tooltip title="Copiar alias">
                            <IconButton onClick={() => copiar(cuenta.ALIAS, 'Alias')}>
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Typography display="flex" alignItems="center" gutterBottom>
                        <strong style={{ marginRight: 8 }}>CBU:</strong> {cuenta.CBU}
                        <Tooltip title="Copiar CBU">
                            <IconButton onClick={() => copiar(cuenta.CBU, 'CBU')}>
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default InfoCuenta;
