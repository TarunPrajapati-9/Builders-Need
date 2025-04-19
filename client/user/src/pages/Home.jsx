import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
// import products from "../data/products";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../utils/dataGetter";

const Home = () => {
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (filterOptions) => {
    const { category, priceRange, filters, sortBy } = filterOptions;

    // Apply filters
    let result = [...products];

    // Filter by category
    if (category && category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    // Filter by price range
    result = result.filter((product) => {
      const price = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply additional filters
    if (filters.freeShipping) {
      result = result.filter((product) => product.freeShipping);
    }

    if (filters.inStock) {
      result = result.filter((product) => product.inStock);
    }

    if (filters.onSale) {
      result = result.filter((product) => product.discount > 0);
    }

    // Sort products
    if (sortBy === "priceLow") {
      result.sort((a, b) => {
        const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
        return priceA - priceB;
      });
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => {
        const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
        return priceB - priceA;
      });
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    // setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const products = data?.data || [];
  // console.log(products);

  if (!data?.success || !data?.data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <Alert severity="error">
          {data?.message || "Something went wrong!"}
        </Alert>
      </Box>
    );
  }

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageCount = Math.ceil(products.length / productsPerPage);

  // Loading skeleton
  const ProductSkeleton = () => (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Skeleton variant="rectangular" width="100%" height={180} />
      <Skeleton variant="text" sx={{ mt: 1 }} height={50} />
      <Skeleton variant="text" width="60%" />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="30%" />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Skeleton variant="rectangular" width="75%" height={36} />
        <Skeleton variant="circular" width={36} height={36} />
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Filter Section */}
        <Grid item xs={12} md={3}>
          <ProductFilter onFilterChange={handleFilterChange} />
        </Grid>

        {/* Product Grid */}
        <Grid item xs={12} md={9}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: 600, mb: isSmallScreen ? 2 : 0 }}
            >
              Products {products.length > 0 && `(${products.length})`}
            </Typography>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                id="sort-select"
                value={sortOption}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="priceLow">Price: Low to High</MenuItem>
                <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Product Cards */}
          <Grid container spacing={3}>
            {isLoading ? (
              Array.from(new Array(8)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ProductSkeleton />
                </Grid>
              ))
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 8,
                    px: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    No products found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters to find products.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {/* Pagination */}
          {products.length > productsPerPage && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size={isSmallScreen ? "small" : "medium"}
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
