import { ApartmentRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Avatar,
  Stack,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import "./about.css";

export default function AboutUs() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1vh",
          padding: "40px",
        }}
      >
        <Stack spacing={2} mb={2.5}>
          <IconButton sx={{ color: "black" }} onClick={handleHome}>
            <ApartmentRounded />
            <Typography fontSize={30} align="center" fontFamily={"Montserrat"}>
              &nbsp;Builder &apos;s Need Team
            </Typography>
          </IconButton>
          <Typography
            variant="body1"
            fontSize={16}
            align="justify"
            fontFamily="Work Sans"
          >
            Builder&apos;s Needs is the thought that all the persons who is
            related with construction business are can be buy the the things
            which are useful in constructing. The Main Thought behind this web
            application is that all such things are can availabe at one place
            and lots of variety is also available for customers.
            <br /> <br />
            The Builder&apos;s need team members are ready to help our valuable
            customers for their requirements.
          </Typography>
        </Stack>
      </Container>
      <Container
        maxWidth="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F5EFE7",
          padding: "25px",
        }}
      >
        <Typography fontSize={30} fontFamily={"Montserrat"} align="center">
          Meet The Developer
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
          mt={1}
        >
          <Avatar
            alt="Remy Sharp"
            src="/profile.JPG"
            sx={{
              color: "transparent",
              height: "6.5rem",
              width: "6.5rem",
              maxWidth: "100%",
              borderRadius: "9999px",
            }}
          />
          <h2>Tarun Prajapati</h2>
          <Typography fontSize={18} align="justify" fontFamily="Work Sans">
            Email: tarun.prajapati912@gmail.com
            <br />
            GitHub:
            <a
              href="https://github.com/TarunPrajapati-9"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: "#2563EB" }}
            >
              &nbsp;@TarunPrajapati
            </a>
            <br />
            <br />
          </Typography>
        </Box>
        <Typography variant="body2" fontSize={16} fontFamily="Work Sans">
          Full-Stack Web Developer(MERN Stack) with knowledge of UI Libraries
          like Bootstrap, Material UI. Previously Working on ASP.NET and PHP.
        </Typography>
      </Container>
    </>
  );
}
