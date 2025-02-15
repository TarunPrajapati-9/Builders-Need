import { ApartmentRounded } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
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

// Developers data as JSON
const developers = [
  {
    name: "Tarun Prajapati",
    email: "tarun.prajapati912@gmail.com",
    github: "https://github.com/TarunPrajapati-9",
    avatar: "/profile.JPG",
    description:
      "Full-Stack Web Developer(MERN Stack) with knowledge of UI Libraries like Bootstrap, Material UI. Previously Working on ASP.NET and PHP.",
  },
  {
    name: "Hansil Chapadiya",
    email: "hansil.chapadiya@example.com",
    github: "https://github.com/Hansil-Chapadiya",
    avatar: "/hansil.jpeg",
    description:
      "Software Developer with expertise in Backend Development and ML. Skilled in Python, Node.js",
  },
];

export default function AboutUs() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      {/* About Us Section */}
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
          <IconButton onClick={handleHome}>
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

      {/* Meet The Developers Section */}
      <Container
        maxWidth="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme.palette.mode === "light" ? "#F5EFE7" : "#000",
          padding: "25px",
        }}
      >
        <Typography fontSize={30} fontFamily={"Montserrat"} align="center">
          Meet The Developers
        </Typography>

        {/* Mapping through developers array */}
        {developers.map((dev, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            <Avatar
              alt={dev.name}
              src={dev.avatar}
              sx={{
                color: "transparent",
                height: "6.5rem",
                width: "6.5rem",
                maxWidth: "100%",
                borderRadius: "9999px",
              }}
            />
            <h2>{dev.name}</h2>
            <Typography fontSize={18} align="justify" fontFamily="Work Sans">
              Email: {dev.email}
              <br />
              GitHub:
              <a
                href={dev.github}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#2563EB" }}
              >
                &nbsp;@{dev.github.split("/").pop()}
              </a>
              <br />
              <br />
            </Typography>
            <Typography
              variant="body2"
              fontSize={16}
              fontFamily="Work Sans"
              align="center"
            >
              {dev.description}
            </Typography>
          </Box>
        ))}
      </Container>
    </>
  );
}
