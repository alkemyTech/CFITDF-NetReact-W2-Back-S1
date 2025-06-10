// src/components/auth/auth-guard.tsx
import { useNotifications } from '@toolpad/core';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
    children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
    const navigate = useNavigate();
    const notifications = useNotifications()

    useEffect(() => {
        const token = localStorage.getItem('token');
        const interceptorId = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    notifications.show('No esta autorizado, vuelva a iniciar sesión', {
                        severity: "error",
                        key: "unauthorized-message"
                    });
                }
                return Promise.reject(error);
            }
        );
        if (!token) {
            navigate('/'); // redirige al login si no hay token
        }
        return () => {
            axios.interceptors.response.eject(interceptorId)
        }
    }, [navigate]);

    return <>{ children }</>;
}
