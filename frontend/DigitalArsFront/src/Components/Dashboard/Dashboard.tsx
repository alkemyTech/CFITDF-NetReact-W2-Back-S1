import { createTheme } from "@mui/material/styles";
import HouseIcon from "@mui/icons-material/House";
import SavingsIcon from "@mui/icons-material/Savings";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import {
  DashboardLayout as CoreDashboardLayout,
  type Navigation,
} from "@toolpad/core";
import { Outlet } from "react-router-dom";

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Inicio",
    icon: <HouseIcon />,
  },
  {
    segment: "dashboard/transacciones",
    title: "Transacciones",
    icon: <ReceiptIcon />,
  },
  {
    segment: "dashboard/ahorros",
    title: "Ahorros",
    icon: <SavingsIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayout() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} theme={demoTheme}>
      <CoreDashboardLayout>
        <Outlet />
      </CoreDashboardLayout>
    </ReactRouterAppProvider>
  );
}
