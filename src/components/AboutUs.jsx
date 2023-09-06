import { Container, Stack, Typography } from "@mui/material";
export default function AboutUs() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1vh",
      }}
    >
      <Stack spacing={2} direction="column">
        <Typography variant="caption" fontSize={30}>
          Builder &apos;s Need Team
        </Typography>
      </Stack>
    </Container>
  );
}
