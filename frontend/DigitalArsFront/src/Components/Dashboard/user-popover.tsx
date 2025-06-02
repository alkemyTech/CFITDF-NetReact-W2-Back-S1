// src/components/dashboard/user-popover.tsx
import React from 'react';
import {
    Popover,
    Box,
    Typography,
    Divider,
    MenuList,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

interface UserPopoverProps {
    anchorEl: Element | null;
    onClose: () => void;
    open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const nombre = user.NOMBRE || 'Usuario';
    const email = user.EMAIL || 'correo@dominio.com';

    const handleSignOut = () => {
        localStorage.removeItem('token');
        onClose();
        navigate('/');
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={open}
            onClose={onClose}
            PaperProps={{ sx: { width: 240 } }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1">{nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {email}
                </Typography>
            </Box>
            <Divider />
            <MenuList disablePadding sx={{ p: 1 }}>
                <MenuItem component={Link} to="/configuracion" onClick={onClose}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Configuración
                </MenuItem>
                <MenuItem component={Link} to="/perfil" onClick={onClose}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Perfil
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </MenuList>
        </Popover>
    );
}
