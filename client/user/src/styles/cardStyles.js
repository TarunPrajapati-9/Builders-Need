export const cartStyles = {
  container: {
    py: 5,
    px: { xs: 2, md: 4 },
  },
  pageTitle: {
    fontWeight: 600,
    mb: 4,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -8,
      left: 0,
      width: 60,
      height: 3,
      //   bgcolor: "primary.main",
      //   borderRadius: 2,
    },
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  errorAlert: {
    width: "100%",
    maxWidth: 400,
  },
  cartContent: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 3,
    alignItems: { xs: "center", md: "flex-start" },
  },
  cartItemsContainer: {
    flex: "1 1 auto",
    width: "100%",
    maxWidth: { md: "calc(100% - 340px)" },
  },
};
