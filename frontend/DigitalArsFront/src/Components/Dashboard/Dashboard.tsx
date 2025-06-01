// src/Components/Dashboard/Dashboard.tsx

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, CssBaseline } from '@mui/material';
import getTheme from '../../../theme'; // Asegurate de tener theme.ts en src/
import type { Dispatch, SetStateAction } from 'react';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>Dashboard content for {pathname}</Typography>
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
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DemoProvider window={demoWindow}>
        <AppProvider
          navigation={NAVIGATION}
          router={router}
          theme={theme}
          window={demoWindow}
        >
          <DashboardLayout>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1,
              }}
            >
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
            <DemoPageContent pathname={router.pathname} />
          </DashboardLayout>
        </AppProvider>
      </DemoProvider>
    </ThemeProvider>
  );
}
