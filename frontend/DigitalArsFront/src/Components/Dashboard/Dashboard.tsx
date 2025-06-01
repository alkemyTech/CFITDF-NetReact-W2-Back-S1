// src/Components/Dashboard/Dashboard.tsx

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import getTheme from '../../../theme';

const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Main' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'transaccion', title: 'Transacciones', icon: <ShoppingCartIcon /> },
  { segment: 'reportes', title: 'Reportes', icon: <BarChartIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Otros' },
  { segment: 'integraciones', title: 'Integraciones', icon: <LayersIcon /> },
];

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 6,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '80vh',
        backgroundColor: 'background.default',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bienvenido al Panel de Control
      </Typography>
      <Typography variant="body1">
        Seleccioná una opción del menú para comenzar.
      </Typography>
    </Box>
  );
}

interface DemoProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  window?: () => Window;
}

export default function DashboardLayoutBasic({ darkMode, setDarkMode, window }: DemoProps) {
  const router = useDemoRouter('/dashboard');
  const theme = getTheme(darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider router={router} navigation={NAVIGATION}>
        <DemoProvider>
          <DashboardLayout>
            <DemoPageContent pathname={router.pathname} />
          </DashboardLayout>
        </DemoProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
