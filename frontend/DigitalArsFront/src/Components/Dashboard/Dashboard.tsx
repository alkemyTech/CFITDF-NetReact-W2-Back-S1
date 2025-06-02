import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { CssBaseline } from '@mui/material';

import { AuthGuard } from '@/Components/auth/auth-guard';
import { MainNav } from '@/Components/Dashboard/main-nav';
import { SideNav } from '@/Components/Dashboard/side-nav';
import SaldoCard from '../Saldo/SaldoCard';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function dashboard({ children }: LayoutProps): React.JSX.Element {
  return (
    <AuthGuard>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '64px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
            fontFamily: 'Poppins, sans-serif',
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <SideNav />
            <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
              <MainNav />
              <main>
                <Container maxWidth="xl" sx={{ py: '64px' }}>
                  <Box mb={4}>
                    <SaldoCard />
                  </Box>
                  {children}
                </Container>
              </main>
            </Box>
          </Box>
        </AuthGuard>
  );
}
