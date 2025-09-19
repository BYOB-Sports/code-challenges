import { Grid, Typography, Box } from "@mui/material";
import CourtCard from "./CourtCard";

export default function CourtsGrid({ courts, isStale = false }) {
  if (courts.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
          opacity: isStale ? 0.7 : 1,
          transition: 'opacity 0.2s ease'
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No courts found matching your search
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your search terms
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      opacity: isStale ? 0.7 : 1,
      transition: 'opacity 0.2s ease'
    }}>
      <Grid container size={{ xs: 12, sm: 6, md: 4, lg: 3 }} spacing={3}>
        {courts.map((court) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={court.id}>
            <CourtCard court={court} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}