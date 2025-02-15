import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/dataGetter";
import LoadingComponent from "./Loader";

function Products() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
  });

  // console.log("Data: " + data);
  // Handling loading, error and data display conditions
  if (isLoading) {
    return <LoadingComponent />; // Display a loading message while data is being fetched
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>; // Display error message
  }

  return (
    <div className="my-6 mx-6">
      <Grid container spacing={2} align="center">
        {data?.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                position: "relative",
                maxWidth: 340,
                height: 370,
                border: "1px solid rgba(0, 0, 0, 0.2)",
              }}
              key={item.name}
            >
              {/* Make the entire CardActionArea clickable by wrapping it with the Link */}
              <Link
                to={`/products/${item.name.toLowerCase()}`}
                style={{ textDecoration: "none", color: "inherit" }}
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
              </Link>
              <CardActions>
                <Button size="small" color="primary">
                  <Link
                    to={`/products/${item.name.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Explore
                  </Link>
                </Button>

                <Chip
                  label={item.category}
                  style={{
                    position: "absolute",
                    borderRadius: "10px",
                    top: "8px",
                    right: "8px",
                    zIndex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust the RGBA values as needed
                    color: "rgba(0, 0, 255, 1)",
                  }}
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products;
