import React, { useState } from "react";
import courtsData from "../data/courts";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  TextField,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating, // New import
} from "@mui/material";
import Header from "../components/Header";

const CourtsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // This sorting logic is an example of a key functional improvement.
  const sortCourts = (courts) => {
    switch (sortBy) {
      case "name":
        return [...courts].sort((a, b) => a.name.localeCompare(b.name));
      case "state":
        return [...courts].sort((a, b) => {
          const stateA = a.location.split(', ')[1];
          const stateB = b.location.split(', ')[1];
          return stateA.localeCompare(stateB);
        });
      case "city":
        return [...courts].sort((a, b) => {
          const cityA = a.location.split(', ')[0];
          const cityB = b.location.split(', ')[0];
          return cityA.localeCompare(cityB);
        });
      case "rating":
        // Sorting by rating in descending order is a good UX choice.
        return [...courts].sort((a, b) => b.rating - a.rating);
      default:
        return courts;
    }
  };

  const filteredCourts = sortCourts(
    courtsData.filter((court) =>
      court.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Header />
      <Box sx={{ my: 3, display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Search courts..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="city">City</MenuItem>
            <MenuItem value="state">State</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredCourts.map((court) => (
          <Grid item xs={12} sm={6} md={4} key={court.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    {court.name}
                  </Typography>
                  <Chip
                    label={court.type}
                    color={court.type === "public" ? "primary" : "secondary"}
                    size="small"
                  />
                </Box>
                {/* Displaying the rating provides a quick visual cue for users. */}
                <Rating name="read-only" value={court.rating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                  {court.location}
                </Typography>
                <Typography variant="body2" fontStyle="italic" mt={1}>
                  Surface: {court.surface}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <RouterLink to={`/courts/${court.id}`} style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ '&:hover': { textDecoration: 'underline' } }}
                    >
                      View Details
                    </Typography>
                  </RouterLink>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourtsList;