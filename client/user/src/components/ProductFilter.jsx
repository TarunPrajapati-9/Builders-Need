import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const FilterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  position: "sticky",
  top: theme.spacing(10),
}));

const categories = [
  "All",
  "Flooring",
  "Plumbing",
  "Concrete & Masonry",
  "Electrical & Lighting",
  "Other",
];
// const clean = name.replace(/\s+/g, "");
const ProductFilter = ({
  onFilterChange,
  availableCategories = categories,
  initialPrice = [0, 500],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(initialPrice);
  const [filters, setFilters] = useState({
    freeShipping: false,
    inStock: false,
    onSale: false,
  });
  const [sortBy, setSortBy] = useState("featured");

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceChangeCommitted = (event, newValue) => {
    // Only update filters when slider interaction ends
    applyFilters({ priceRange: newValue });
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters({
      ...filters,
      [name]: checked,
    });

    applyFilters({
      filters: {
        ...filters,
        [name]: checked,
      },
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    applyFilters({ category });
  };

  // const handleSortChange = (event) => {
  //   const value = event.target.value;
  //   setSortBy(value);
  //   applyFilters({ sortBy: value });
  // };

  const applyFilters = (changedFilter) => {
    const newFilters = {
      category:
        changedFilter.category !== undefined
          ? changedFilter.category
          : selectedCategory,
      priceRange: changedFilter.priceRange || priceRange,
      filters: changedFilter.filters || filters,
      sortBy: changedFilter.sortBy || sortBy,
    };

    // Pass filter state to parent component
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setPriceRange(initialPrice);
    setFilters({
      freeShipping: false,
      inStock: false,
      onSale: false,
    });
    setSortBy("featured");

    // Update parent component with cleared filters
    onFilterChange({
      category: "All",
      priceRange: initialPrice,
      filters: {
        freeShipping: false,
        inStock: false,
        onSale: false,
      },
      sortBy: "featured",
    });
  };

  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  const filterContent = (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        {isMobile && (
          <Button
            variant="text"
            color="inherit"
            onClick={toggleMobileFilter}
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Accordion defaultExpanded elevation={0} disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="category-content"
          id="category-header"
        >
          <Typography variant="subtitle1" fontWeight={500}>
            Category
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {availableCategories.map((category) => (
              <Chip
                key={category}
                label={category}
                variant={selectedCategory === category ? "filled" : "outlined"}
                color={selectedCategory === category ? "primary" : "default"}
                onClick={() => handleCategorySelect(category)}
                sx={{ mb: 0.5 }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider />

      <Accordion defaultExpanded elevation={0} disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="price-content"
          id="price-header"
        >
          <Typography variant="subtitle1" fontWeight={500}>
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={50000}
              step={100}
              marks={[
                { value: 0, label: "₹0" },
                { value: 50000, label: "₹50000" },
              ]}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <TextField
                label="Min"
                value={`₹${priceRange[0]}`}
                size="small"
                disabled
                sx={{ width: "45%" }}
              />
              <TextField
                label="Max"
                value={`₹${priceRange[1]}`}
                size="small"
                disabled
                sx={{ width: "45%" }}
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider />

      <Accordion defaultExpanded elevation={0} disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="more-filters-content"
          id="more-filters-header"
        >
          <Typography variant="subtitle1" fontWeight={500}>
            More Filters
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.freeShipping}
                  onChange={handleFilterChange}
                  name="freeShipping"
                />
              }
              label="Free Shipping"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.inStock}
                  onChange={handleFilterChange}
                  name="inStock"
                />
              }
              label="In Stock Only"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.onSale}
                  onChange={handleFilterChange}
                  name="onSale"
                />
              }
              label="On Sale"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider />

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={clearAllFilters}
        >
          Clear All Filters
        </Button>
      </Box>
    </>
  );

  // Mobile filter button
  const mobileFilterButton = isMobile && (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<FilterListIcon />}
      onClick={toggleMobileFilter}
      sx={{ mb: 2 }}
      fullWidth
    >
      Filter Products
    </Button>
  );

  // Mobile filter drawer
  const mobileFilterDrawer = isMobile && showMobileFilter && (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
        zIndex: 1200,
        overflow: "auto",
        p: 2,
      }}
    >
      {filterContent}
    </Box>
  );

  return (
    <>
      {mobileFilterButton}
      {mobileFilterDrawer}

      {!isMobile && <FilterPaper elevation={1}>{filterContent}</FilterPaper>}
    </>
  );
};
ProductFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  availableCategories: PropTypes.arrayOf(PropTypes.string),
  initialPrice: PropTypes.arrayOf(PropTypes.number),
};

export default ProductFilter;
