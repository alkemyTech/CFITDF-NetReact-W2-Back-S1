import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Box,
    Divider,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SavingsIcon from '@mui/icons-material/Savings';
import BarChartIcon from '@mui/icons-material/BarChart';


const navItems = [
    { title: 'Menu', icon: <DashboardIcon />, path: '/dashboard' },   
    { title: 'Movimientos', icon: <BarChartIcon />, path: '/Transaccion'  },
    { title: 'Ahorros', icon: <SavingsIcon />, path: '/plazofijo/crear' },
];

export function SideNav(): React.JSX.Element {
    const location = useLocation();

    return (
        <Box
            sx={{
                bgcolor: '#111827',
                color: 'white',
                display: { xs: 'none', lg: 'flex' },
                flexDirection: 'column',
                height: '100vh',
                width: 'var(--SideNav-width)',
                position: 'fixed',
                zIndex: 'var(--SideNav-zIndex)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Typography variant="h6" noWrap>
                    DigitalArs
                </Typography>
            </Toolbar>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            <List>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.title} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    color: isActive ? 'primary.main' : 'inherit',
                                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.08)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'white' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
