import * as React from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActionArea, CardActions } from "@mui/material";

function Items() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/api/items/fetchitems`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleClick = () => {};
  return (
    <>
      <div className="my-3 mx-3">
        <Grid container spacing={2} align="center">
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => handleClick(index)}
                sx={{
                  position: "relative",
                  maxWidth: 340,
                  height: 370,
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                }}
                key={item.name}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`${import.meta.env.VITE_BACKEND_URI}/uploads/${
                      item.imageUrl
                    }`}
                    className="h-44"
                    alt="Image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleClick(index)}
                  >
                    Explore
                  </Button>
                  <Chip
                    label={item.category}
                    style={{
                      position: "absolute",
                      borderRadius: "10px",
                      top: "8px",
                      right: "8px",
                      zIndex: 1,
                      backgroundColor: "rgba(255, 255,255, 0.7)", // Adjust the RGBA values as needed
                      color: "rgba(0, 0, 255, 1)",
                    }}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default Items;
