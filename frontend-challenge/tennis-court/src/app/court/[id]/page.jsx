import { notFound } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Rating,
} from "@mui/material";
import Image from "next/image";
import courtsData from "@/lib/mockCourts.json";
import BackButton from "./components/BackButton";
import ReviewsSection from "./components/ReviewsSection";

export default async function CourtDetailPage({ params }) {
  const { id } = await params;
    
  const court = courtsData.find((c) => c.id === Number(id));
  
  if (!court) {
    notFound();
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <BackButton />

      <Card sx={{ borderRadius: 3, mb: 4, boxShadow: 3, overflow: "hidden" }}>
        <Box sx={{ width: "100%", height: 220, position: "relative" }}>
          <Image
            src={
              court.photo || "https://via.placeholder.com/400x220?text=No+Image"
            }
            alt={court.name || "Court"}
            fill
            style={{
              objectFit: "cover",
            }}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4//8/AwAI/AL+KD3eAAAAAElFTkSuQmCC"
            sizes="(max-width: 600px) 100vw,
                   (max-width: 900px) 50vw,
                   100vw"
            priority
          />
        </Box>

        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {court?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {court?.location}
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            {court?.description}
          </Typography>
          <Rating value={court?.rating} readOnly />
        </CardContent>
      </Card>

      <ReviewsSection />
    </Container>
  );
}