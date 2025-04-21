import React from "react";
import { Box, Typography } from "@mui/material";
import { Clock, Package, Truck, CheckCircle, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  showText?: boolean;
  size?: "small" | "medium" | "large";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showText = true,
  size = "medium",
}) => {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Pending":
        return {
          icon: (
            <Clock size={getIconSize()} style={{ color: "var(--color)" }} />
          ),
          color: "#9ACD32",
          backgroundColor: "rgba(154, 205, 50, 0.1)",
          label: "Pending",
        };
      case "Confirmed":
        return {
          icon: (
            <Package size={getIconSize()} style={{ color: "var(--color)" }} />
          ),
          color: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          label: "Confirmed",
        };
      case "Shipped":
        return {
          icon: (
            <Truck size={getIconSize()} style={{ color: "var(--color)" }} />
          ),
          color: "#9333EA",
          backgroundColor: "rgba(147, 51, 234, 0.1)",
          label: "Shipped",
        };
      case "Delivered":
        return {
          icon: (
            <CheckCircle
              size={getIconSize()}
              style={{ color: "var(--color)" }}
            />
          ),
          color: "#22C55E",
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          label: "Delivered",
        };
      case "Cancelled":
        return {
          icon: (
            <XCircle size={getIconSize()} style={{ color: "var(--color)" }} />
          ),
          color: "#EF4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          label: "Cancelled",
        };
      default:
        return {
          icon: (
            <Clock size={getIconSize()} style={{ color: "var(--color)" }} />
          ),
          color: "#6B7280",
          backgroundColor: "rgba(107, 114, 128, 0.1)",
          label: status,
        };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      default:
        return 20;
    }
  };

  const getTypographyVariant = () => {
    switch (size) {
      case "small":
        return "caption";
      case "large":
        return "body1";
      default:
        return "body2";
    }
  };

  const { icon, color, backgroundColor, label } = getStatusInfo(status);

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        borderRadius: "16px",
        padding: showText ? "4px 12px" : "4px",
        backgroundColor,
        "--color": color,
        transition: "all 0.3s ease",
        "&:hover": {
          filter: "brightness(0.95)",
        },
      }}
    >
      {icon}
      {showText && (
        <Typography
          variant={getTypographyVariant()}
          component="span"
          sx={{
            color,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default StatusBadge;
