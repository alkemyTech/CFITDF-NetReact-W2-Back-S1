import { Box, Card, CardActionArea, CardContent,  Stack, SvgIcon, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { PageContainer } from "@toolpad/core";
import { Link, Outlet } from "react-router-dom"; 

function AdminPageCard({ title, href, Icon, }: { title: string, href: string, Icon: typeof SvgIcon }) {
  return (
    <Card>
      {/*@ts-expect-error */}
      <CardActionArea LinkComponent={Link} to={href}>
        <CardContent>
          <Stack gap={5} p={2} justifyContent="center" alignItems="center">
            <Icon fontSize="large" />
            <Typography variant="h5">{title}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default function AdminPage() {
  return (
    <PageContainer>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Stack flex={1} minWidth={300}>
          <AdminPageCard title="Administrar Usuarios" Icon={PeopleIcon} href="usuarios" />
        </Stack>
        <Stack flex={1} minWidth={300}>
          <AdminPageCard title="Administrar Cuentas" Icon={CreditCardIcon} href="cuentas" />
        </Stack>
      </Box>
      <Outlet />
    </PageContainer>
  );
}