import { Badge, IconButton, Stack, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function ActionsToolbar() {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Tooltip title="Buscar">
        <IconButton color="default">
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Contactos">
        <IconButton color="default">
          <GroupIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Notificaciones">
        <IconButton color="default">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
