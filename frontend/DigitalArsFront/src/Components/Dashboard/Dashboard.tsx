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
<<<<<<< HEAD
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider, CssBaseline } from '@mui/material';
import getTheme from '../../../theme'; // Asegurate de tener theme.ts en src/
import type { Dispatch, SetStateAction } from 'react';
=======
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

>>>>>>> 92405497046202e197d6a4b170ae04ec5977c1ec

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
    segment: 'Transaccion',
    title: 'Transaccion',
    icon: <DashboardIcon />,
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
  const navigate = useNavigate();
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
<<<<<<< HEAD
      <Typography variant="h5" gutterBottom>Dashboard content for {pathname}</Typography>
=======
      <Typography>Dashboard content for {pathname}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/transaccion")}>
        Ir a Transacción </Button>
>>>>>>> 92405497046202e197d6a4b170ae04ec5977c1ec
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
<<<<<<< HEAD
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
=======
    // Remove this provider when copying and pasting into your project.
    <DemoProvider window={demoWindow}>
      {/* preview-start */}
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      
      </AppProvider>
      {/* preview-end */}
    </DemoProvider>
>>>>>>> 92405497046202e197d6a4b170ae04ec5977c1ec
  );
}
