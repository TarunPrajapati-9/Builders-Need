/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { Typography, TextField, Modal, Avatar, Button } from "@mui/material/";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Model({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Avatar
            sx={{
              margin: 1,
              background: "transparent",
              width: "2.5rem",
              height: "2.5rem",
            }}
            src="/favicon.png"
          />
          <Close onClick={handleClose} sx={{ cursor: "pointer" }} />
        </div>
        <Typography component="h1" variant="h5">
          Contact
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="mo"
            label="Mobile No."
            type="tel"
            id="mo"
            InputProps={{
              inputProps: {
                maxLength: 10,
                minLength: 10,
              },
            }}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="msg"
            label="Write Message"
            name="msg"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
        <Typography variant="subtitle2">
          Contact via E-Mail :- buildersneed@gmail.com ( We will try to reply to
          you as soon as possible.)
        </Typography>
      </Box>
    </Modal>
  );
}

{
  /* <Model
          open={isProfileModalOpen}
          handleClose={handleProfileModalClose}
        /> */
}
