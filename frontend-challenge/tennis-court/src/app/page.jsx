import { Container, Typography } from "@mui/material";
import courtsData from "@/lib/mockCourts.json";
import SearchAndResults from "@/components/SearchAndResults";

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Tennis Courts
      </Typography>

      <SearchAndResults initialCourts={courtsData} />
    </Container>
  );
}