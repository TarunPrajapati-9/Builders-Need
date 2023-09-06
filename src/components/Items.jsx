import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActionArea, CardActions } from "@mui/material";

import Orders from "./Orders";
import History from "./History";

function Items() {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const items = [
    "Steel",
    "Cement",
    "Sand",
    "Aggregate",
    "Bricks",
    "Blocks",
    "Tiles",
    "Chemicals",
  ];

  const handleClick = (index) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        style={{ marginTop: "1vh", marginBottom: "5vh" }}
        align="center"
      >
        {items.map((text, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              onClick={() => handleClick(index)}
              sx={{ maxWidth: 340, border: "1px solid rgba(0, 0, 0, 0.2)" }}
              key={text}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    index === 0
                      ? "steel.png"
                      : index === 1
                      ? "cement.png"
                      : index === 2
                      ? "sand.jpeg"
                      : index === 3
                      ? "aggregate.jpg"
                      : index === 4
                      ? "brick.png"
                      : index === 5
                      ? "block.png"
                      : index === 6
                      ? "tile2.png"
                      : index === 7
                      ? "chemical.png"
                      : "/"
                  }
                  alt="Image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {text}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Here, see various types of {text} and see how it suitable
                    for you.
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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div>
        {selectedIndex === 1 && <Items />}
        {selectedIndex === 2 && <Orders />}
        {selectedIndex === 3 && <History />}
      </div>
    </>
  );
}

export default Items;
