import { usePopover } from "@/hooks/use-popover";
import { Avatar } from "@mui/material";
import { UserPopover } from "./user-popover";

export default function AccountToolbar() {
  const userPopover = usePopover<HTMLDivElement>();

  return (
    <>
      <Avatar
        alt="Usuario"
        src="https://i.pravatar.cc/150?img=32"
        onClick={userPopover.handleOpen}
        ref={userPopover.anchorRef}
        sx={{ width: 36, height: 36, cursor: "pointer" }}
      />
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        open={userPopover.open}
        onClose={userPopover.handleClose}
      />
    </>
  );
}
