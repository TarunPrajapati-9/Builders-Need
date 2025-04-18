import {
  Stepper,
  Step,
  StepLabel,
  Box,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";

CustomStepIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  icon: PropTypes.number.isRequired,
};

const StepIconContainer = styled(Box)(({ theme, ownerState }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: ownerState.active
    ? theme.palette.primary.main
    : ownerState.completed
    ? theme.palette.success.main
    : theme.palette.grey[300],
  color:
    ownerState.active || ownerState.completed
      ? "#fff"
      : theme.palette.grey[700],
  transition: "all 0.3s ease",
}));

function CustomStepIcon({ active, completed, icon }) {
  let StepIcon = EmailIcon;
  if (icon === 1) StepIcon = EmailIcon;
  else if (icon === 2) StepIcon = LockIcon;
  else if (icon === 3) StepIcon = AccountBoxIcon;
  else if (icon === 4) StepIcon = CheckCircleIcon;

  return (
    <StepIconContainer ownerState={{ active, completed }}>
      {completed ? <CheckCircleIcon /> : <StepIcon />}
    </StepIconContainer>
  );
}

RegistrationStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default function RegistrationStepper({ activeStep }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const steps = ["Email", "Verification", "Details", "Complete"];

  return (
    <Stepper activeStep={activeStep} alternativeLabel={!isMobile}>
      {steps.map((label, index) => (
        <Step key={label + index}>
          <StepLabel StepIconComponent={CustomStepIcon}>
            {!isMobile && label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
