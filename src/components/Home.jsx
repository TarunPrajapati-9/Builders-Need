import { useState, useEffect } from "react";
import { Button, CssBaseline, Grid, Fab, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const images = [
  "steel.png",
  "aggregate.jpg",
  "cement.png",
  "block.png",
  "brick.png",
  "chemical.png",
  "sand.jpeg",
  "tile.png",
  // Add your image URLs here
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, []);

  const imageCaptions = [
    "Steel",
    "Aggregate",
    "Cement",
    "Block",
    "Bricks",
    "Chemical",
    "Sand",
    "Tile",
  ];

  return (
    <>
      <CssBaseline />
      <Grid container justifyContent="center" style={{ marginTop: "2.5vh" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              backgroundColor: "#E0F2F1",
              padding: "20px",
              border: "1px solid #1976D2",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="caption"
              style={{
                fontFamily: "monospace",
                fontSize: "25px",
                color: "#1976D2",
              }}
            >
              {imageCaptions[currentImageIndex]}
            </Typography>
            <Button
              variant="outlined"
              style={{
                backgroundColor: "white",
                color: "#1976D2",
                borderColor: "#1976D2",
              }}
            >
              Explore
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Fab color="primary" onClick={prevImage}>
              <ArrowBackIosNewIcon />
            </Fab>
            <Fab color="primary" onClick={nextImage}>
              <ArrowForwardIosIcon />
            </Fab>
          </div>
        </div>
      </Grid>
    </>
  );
}

export default Home;
