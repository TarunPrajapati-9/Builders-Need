import Box from "@mui/material/Box";
import { Stack, Badge } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
import "./BottomBar.css";
import { useState } from "react";
import Model from "../ContactModel";

function BottomBar() {
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const navigateToURL = (url) => {
    window.open(url, "_blank");
  };

  const handleContactModalOpen = () => {
    setContactModalOpen(true);
  };

  const handleContactModalClose = () => {
    setContactModalOpen(false);
  };

  let date = new Date();
  return (
    <>
      {isContactModalOpen && (
        <Model
          open={isContactModalOpen}
          handleClose={handleContactModalClose}
        />
      )}
      <div className="mt-2">
        <hr className="border-t-2" />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
          mt={2}
        >
          <Box sx={{ width: "50%" }}>
            <h2 className="myTypo">Follow Us</h2>
            <Stack direction={"row"} spacing={1} className="stack" mt={2}>
              <Badge
                className="iconHover badge"
                color="secondary"
                onClick={() => {
                  navigateToURL("https://www.youtube.com");
                }}
              >
                <FacebookIcon />
              </Badge>
              <Badge
                className="iconHover badge"
                color="secondary"
                onClick={() => {
                  navigateToURL("https://www.instagram.com/kathiyawadi__09");
                }}
              >
                <InstagramIcon />
              </Badge>
              <Badge
                className="iconHover badge"
                color="secondary"
                onClick={() => {
                  navigateToURL("https://www.instagram.com/kathiyawadi__09");
                }}
              >
                <TwitterIcon />
              </Badge>
              <Badge
                className="iconHover badge"
                color="secondary"
                onClick={() => {
                  navigateToURL("https://www.instagram.com/kathiyawadi__09");
                }}
              >
                <GitHubIcon />
              </Badge>
            </Stack>
          </Box>
          <Box sx={{ width: "25%" }}>
            <Stack direction={"column"} spacing={1} className="stack">
              <h4 className="headingBlur">USEFUL LINKS</h4>
              <Link to="/about" className="myLink">
                About Us
              </Link>
              <Link to="/products" className="myLink">
                Products
              </Link>
              <Link onClick={handleContactModalOpen} className="myLink">
                Contact Us
              </Link>
              <Link to="/items" className="myLink">
                Latest Offer
              </Link>
            </Stack>
          </Box>
          <Box sx={{ width: "25%" }} className="mb-2">
            <Stack direction={"column"} spacing={1} className="stack">
              <h4 className="headingBlur">SUPPORT</h4>
              <Link to="/items" className="myLink">
                Customer Support
              </Link>
              <Link to="/items" className="myLink">
                Terms & Conditions
              </Link>
              <Link to="/items" className="myLink">
                Privacy Policy
              </Link>
              <Link to="/items" className="myLink">
                Online Shopping Policy
              </Link>
            </Stack>
          </Box>
        </Box>
        <hr className="border-t-2" />
        <h4 className="myTypo my-1">
          Copyright &copy; {date.getFullYear()} Builder&apos;s Needs
        </h4>
      </div>
    </>
  );
}

export default BottomBar;
