import { Card, CardActionArea, CardContent, Grid, Stack, SvgIcon, Typography } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { PageContainer } from "@toolpad/core";
import { Link } from "react-router-dom";

function AdminPageCard({title, href, Icon,}: {title: string, href: string, Icon: typeof SvgIcon}) {
  return (
    <Card>
      {/*@ts-expect-error */}
      <CardActionArea LinkComponent={Link} to={href}>
        <CardContent>
          <Stack gap={5} p={2} justifyContent="center" alignItems="center">
            <Icon fontSize="large"/>
            <Typography variant="h5">{title}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default function AdminPage() {
  return <PageContainer>
    <Grid container spacing={2}>
      <Grid size={{xs: 12, md: 6}}>
        <AdminPageCard title="Administrar Usuarios" Icon={PeopleIcon} href="usuarios" />
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <AdminPageCard title="Administrar Cuentas" Icon={CreditCardIcon} href="cuentas" />
      </Grid>
    </Grid>
  </PageContainer>;
}