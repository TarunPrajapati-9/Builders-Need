import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  backLink?: string;
  breadcrumbs?: Array<{
    label: string;
    link?: string;
  }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  backLink,
  breadcrumbs,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleBack = () => {
    if (backLink) {
      navigate(backLink);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 3,
        pb: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs sx={{ mb: 1 }}>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return crumb.link && !isLast ? (
              <Link
                key={index}
                to={crumb.link}
                style={{
                  color: theme.palette.text.secondary,
                }}
              >
                {crumb.label}
              </Link>
            ) : (
              <Typography
                key={index}
                color={isLast ? "text.primary" : "text.secondary"}
                variant="body2"
              >
                {crumb.label}
              </Typography>
            );
          })}
        </Breadcrumbs>
      )}

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {backLink !== undefined && (
          <IconButton
            onClick={handleBack}
            sx={{ mr: 1, color: "text.secondary" }}
            size={isMobile ? "small" : "medium"}
          >
            <ArrowLeft />
          </IconButton>
        )}

        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h1"
          fontWeight="bold"
          sx={{
            flexGrow: 1,
            animation: "fadeIn 0.5s ease-in-out",
            "@keyframes fadeIn": {
              "0%": {
                opacity: 0,
                transform: "translateY(10px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default PageHeader;
