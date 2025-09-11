

import { useState } from "react";
import type { Court } from "../App";
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
// Grid no longer used; mobile layout uses Box instead



interface CourtTableProps {
  courts: Court[];
  onSelectCourt: (id: string) => void;
}

const PAGE_SIZE = 6;

export default function CourtTable({ courts, onSelectCourt }: CourtTableProps) {
  // Filtering, sorting, and pagination state
  const [search, setSearch] = useState("");
  const [surface, setSurface] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState(1);

  // Helper to get average rating
  function getAverageRating(reviews: { rating: number }[]): number {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  // Star display component
  function StarDisplay({ value }: { value: number }) {
    const fullStars = Math.floor(value);
    const halfStar = value - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <span aria-label={`Rating: ${value} out of 5 stars`}>
        {Array(fullStars).fill(null).map((_, i) => <span key={"full"+i} style={{color: "#f5b50a"}}>★</span>)}
        {halfStar && <span style={{color: "#f5b50a"}}>☆</span>}
        {Array(emptyStars).fill(null).map((_, i) => <span key={"empty"+i} style={{color: "#ccc"}}>★</span>)}
      </span>
    );
  }

type SortKey = "name" | "location" | "surface" | "review";
type SortOrder = "asc" | "desc";



  // Detect mobile screen


  // Controls, filtering, sorting, and pagination logic
  // Unique surface types
  const surfaceTypes = Array.from(new Set(courts.map(c => c.surface)));
  // Filter courts by search, surface, and rating
  const filteredCourts = courts.filter(court => {
    const matchesSearch =
      court.name.toLowerCase().includes(search.toLowerCase()) ||
      court.location.toLowerCase().includes(search.toLowerCase());
    const matchesSurface = surface === "all" || court.surface === surface;
    const avgRating = getAverageRating(court.reviews);
    const matchesRating = avgRating >= minRating;
    return matchesSearch && matchesSurface && matchesRating;
  });

  // Sorting logic
  const sortedCourts = [...filteredCourts].sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const aLoc = a.location.toLowerCase();
    const bLoc = b.location.toLowerCase();
    const aSurface = a.surface.toLowerCase();
    const bSurface = b.surface.toLowerCase();
    const aAvg = getAverageRating(a.reviews);
    const bAvg = getAverageRating(b.reviews);

    let comp = 0;
    switch (sortKey) {
      case 'name':
        comp = aName.localeCompare(bName);
        break;
      case 'location':
        comp = aLoc.localeCompare(bLoc);
        break;
      case 'surface':
        comp = aSurface.localeCompare(bSurface);
        break;
      case 'review':
        comp = aAvg === bAvg ? 0 : (aAvg > bAvg ? 1 : -1);
        break;
      default:
        comp = 0;
    }
    return sortOrder === 'asc' ? comp : -comp;
  });
  const totalPages = Math.ceil(sortedCourts.length / PAGE_SIZE);
  const paginatedCourts = sortedCourts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
  <div style={{ width: '100%', maxWidth: 980, margin: '0 auto', padding: 28, background: 'linear-gradient(180deg, #f7f8fb 0%, #ffffff 100%)', borderRadius: 12 }}>
    {/* Controls */}
    <Box sx={{ width: '100%' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ mb: 3, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search courts..."
        label="Search courts"
        variant="outlined"
        size="small"
        sx={{ minWidth: 180 }}
      />
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="surface-label">Surface</InputLabel>
        <Select
          labelId="surface-label"
          value={surface}
          label="Surface"
          onChange={e => setSurface(e.target.value)}
        >
          <MenuItem value="all">All Surfaces</MenuItem>
          {surfaceTypes.map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="rating-label">Rating</InputLabel>
        <Select
          labelId="rating-label"
          value={minRating}
          label="Rating"
          onChange={e => setMinRating(Number(e.target.value))}
        >
          <MenuItem value={0}>All Ratings</MenuItem>
          {[1,2,3,4,5].map(n => (
            <MenuItem key={n} value={n}>{n} stars & up</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="sortkey-label">Sort by</InputLabel>
        <Select
          labelId="sortkey-label"
          value={sortKey}
          label="Sort by"
          onChange={e => setSortKey(e.target.value as SortKey)}
        >
          <MenuItem value="name">Sort by Name</MenuItem>
          <MenuItem value="location">Sort by Location</MenuItem>
          <MenuItem value="surface">Sort by Surface</MenuItem>
          <MenuItem value="review">Sort by Review</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="sortorder-label">Sort order</InputLabel>
        <Select
          labelId="sortorder-label"
          value={sortOrder}
          label="Sort order"
          onChange={e => setSortOrder(e.target.value as SortOrder)}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
          {filteredCourts.length} courts found
        </Typography>
      </Stack>
    </Box>

      {/* Responsive Table for desktop, cards for mobile */}
  <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' }, borderRadius: 3, boxShadow: 6, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
      <TableCell sx={{ fontWeight: 700, background: 'linear-gradient(90deg,#f3f4f6,#ffffff)' }}>Name</TableCell>
      <TableCell sx={{ fontWeight: 700, background: 'linear-gradient(90deg,#f3f4f6,#ffffff)' }}>Location</TableCell>
      <TableCell sx={{ fontWeight: 700, background: 'linear-gradient(90deg,#f3f4f6,#ffffff)' }}>Surface</TableCell>
      <TableCell sx={{ fontWeight: 700, background: 'linear-gradient(90deg,#f3f4f6,#ffffff)' }}>Rating</TableCell>
      <TableCell sx={{ fontWeight: 700, background: 'linear-gradient(90deg,#f3f4f6,#ffffff)' }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCourts.map((court: Court) => (
      <TableRow key={court.id} hover sx={{ transition: 'transform 220ms ease, box-shadow 220ms ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(20,20,40,0.08)' } }}>
                <TableCell sx={{ fontWeight: 500 }}>{court.name}</TableCell>
                <TableCell>{court.location}</TableCell>
                <TableCell>{court.surface}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={getAverageRating(court.reviews)} precision={0.5} readOnly size="small" />
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{getAverageRating(court.reviews)}</Typography>
                    {court.reviews.length > 0 && (
                      <Typography variant="caption" color="text.secondary">({court.reviews.length})</Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Button variant="contained" size="small" onClick={() => onSelectCourt(court.id.toString())} aria-label={`View details for ${court.name}`}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Card layout for mobile */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {paginatedCourts.map((court: Court) => (
            <Card key={court.id} sx={{ p: 2, borderRadius: 2, boxShadow: 3, transition: 'transform 220ms ease, box-shadow 220ms ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 36px rgba(20,20,40,0.12)' } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>{court.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{court.location} • {court.surface}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <StarDisplay value={getAverageRating(court.reviews)} />
                {court.reviews.length > 0 && (
                  <Typography variant="caption" color="text.secondary">({court.reviews.length})</Typography>
                )}
              </Box>
              <Button variant="contained" size="small" onClick={() => onSelectCourt(court.id.toString())} aria-label={`View details for ${court.name}`}>View Details</Button>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 32 }}>
        <Button variant="outlined" size="small" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <span style={{ fontSize: 13, color: '#888' }}>
          Page {page} of {totalPages}
        </span>
        <Button variant="outlined" size="small" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
