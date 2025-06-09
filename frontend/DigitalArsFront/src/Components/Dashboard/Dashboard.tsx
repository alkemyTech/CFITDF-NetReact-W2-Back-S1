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
import { useUserContext } from "@/Context/UserContext";
import { useMemo } from "react";

const ADMIN_NAVIGATION: Navigation = [
  {
    kind: "page",
    title: "Administrar",
    icon: <SavingsIcon />,
    segment: "dashboard/admin",
    children: [
      { title: "Usuarios", segment: "usuarios" },
      { title: "Cuentas", segment: "cuentas" }
    ]
  },
]


export default function DashboardLayout() {
  const {usuario} = useUserContext()
  const isAdmin = usuario?.ID_ROL === 'Administrador';

  const NAVIGATION = useMemo<Navigation>(() => [
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
    ...(isAdmin ? ADMIN_NAVIGATION : [])
  ], [usuario])
  const theme = useTheme()
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
        <CoreDashboardLayout slots={ {
          toolbarAccount: AccountToolbar,
          toolbarActions: ActionsToolbar
        } }>
          <Outlet />
        </CoreDashboardLayout>
      </ReactRouterAppProvider>
    </AuthGuard>
  );
}