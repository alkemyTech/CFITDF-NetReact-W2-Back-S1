import { useTheme } from "@mui/material/styles";
import HouseIcon from "@mui/icons-material/House";
import SavingsIcon from "@mui/icons-material/Savings";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import {
  DashboardLayout as CoreDashboardLayout,
  type Navigation,
} from "@toolpad/core";
import { Outlet } from "react-router-dom";
import { AuthGuard } from "../auth/auth-guard";
import AccountToolbar from './AccountToolbar';
import ActionsToolbar from './ActionsToolbar';
import { useUserContext } from '../../Context/UserContext'; 
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function DashboardLayout() {
  const theme = useTheme();
  const { usuario } = useUserContext();
  const isAdmin = usuario?.NOMBRE_ROL === "Administrador";

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
    ...(isAdmin
      ? [
        {
          segment: "dashboard/admin",
          title: "Admin",
          icon: <AdminPanelSettingsIcon />,
        },
      ]
      : []),
  ];

  return (
    <AuthGuard>
      <ReactRouterAppProvider
        navigation={ NAVIGATION }
        theme={ theme }
        branding={ {
          logo: <></>,
          title: "Digital ARS",
          homeUrl: "/dashboard",
        } }
      >
        <CoreDashboardLayout
          slots={{
            toolbarAccount: AccountToolbar,
            toolbarActions: ActionsToolbar,
          }}
        >
          <Outlet />
        </CoreDashboardLayout>
      </ReactRouterAppProvider>
    </AuthGuard>
  );
}
