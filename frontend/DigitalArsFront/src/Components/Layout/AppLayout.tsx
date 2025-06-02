// src/components/Layout/AppLayout.tsx
import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';


type Props = {
    children: ReactNode;
};

export default function AppLayout({ children }: Props) {
    return (
        <Box minHeight="100vh" sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                {children}
            </Container>
        </Box>
    );
}
