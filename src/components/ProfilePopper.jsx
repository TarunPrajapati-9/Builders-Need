/* eslint-disable react/prop-types */
import { Popover, Card, CardContent, Avatar, Typography } from "@mui/material";

export default function ProfilePopper({ open, handleClose, anchorEl }) {
  open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Card sx={{ minWidth: 250 }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar alt="profile photo" src="/favicon.png" />
            <Typography sx={{ p: 2, marginLeft: 1 }}>Username</Typography>
          </div>
        </CardContent>
      </Card>
    </Popover>
  );
}
