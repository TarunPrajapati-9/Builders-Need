import Box from "@mui/material/Box";
import { Stack, Badge } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
import "./BottomBar.css";

function BottomBar() {
  const navigateToURL = (url) => {
    window.open(url, "_blank");
  };

  let date = new Date();
  return (
    <>
      <div>
        <hr />
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
              <Link to="/items" className="myLink">
                About Us
              </Link>
              <Link to="/items" className="myLink">
                Items
              </Link>
              <Link to="/items" className="myLink">
                Contact Us
              </Link>
              <Link to="/items" className="myLink">
                Latest Offer
              </Link>
            </Stack>
          </Box>
          <Box sx={{ width: "25%" }}>
            <Stack direction={"column"} spacing={1} className="stack">
              <h4 className="headingBlur">SUPPORT</h4>
              <Link to="/items" className="myLink">
                Customer Support
              </Link>
              <Link to="/items" className="myLink">
                Terms & Conditions
              </Link>
              <Link to="/items" className="myLink">
                Privicy Policy
              </Link>
              <Link to="/items" className="myLink">
                Online Shopping Policy
              </Link>
            </Stack>
          </Box>
        </Box>
        <h4 className="myTypo">
          Copyright &copy; {date.getFullYear()} Builder&apos;s Needs
        </h4>
      </div>
    </>
  );
}

export default BottomBar;
