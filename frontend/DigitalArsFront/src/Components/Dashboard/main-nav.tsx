// src/components/dashboard/layout/main-nav.tsx
import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Avatar,
    Tooltip,
    Stack,
    Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import { UserPopover } from './user-popover';
import { usePopover } from '@/hooks/use-popover';

export function MainNav(): React.JSX.Element {
    const userPopover = usePopover<HTMLDivElement>();

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    left: { lg: 'var(--SideNav-width)' },
                    width: { lg: 'calc(100% - var(--SideNav-width))' },
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    zIndex: 'var(--MainNav-zIndex)',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '64px' }}>
                    <Typography variant="h6" color="text.primary">
                        Panel de Control
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Tooltip title="Buscar">
                            <IconButton color="default">
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Contactos">
                            <IconButton color="default">
                                <GroupIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notificaciones">
                            <IconButton color="default">
                                <Badge badgeContent={3} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Box>
                            <Avatar
                                alt="Usuario"
                                src="https://i.pravatar.cc/150?img=32"
                                onClick={userPopover.handleOpen}
                                ref={userPopover.anchorRef}
                                sx={{ width: 36, height: 36, cursor: 'pointer' }}
                            />
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>

            <UserPopover
                anchorEl={userPopover.anchorRef.current}
                open={userPopover.open}
                onClose={userPopover.handleClose}
            />
        </>
    );
}