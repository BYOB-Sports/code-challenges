import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  TextField, 
  Box, 
  Typography, 
  IconButton, 
  InputAdornment,
  Paper,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Button,
  Chip
} from '@mui/material';
import { 
  Search, 
  Tune, 
  LocationOn, 
  Star, 
  StarBorder, 
  FilterList,
  Close
} from '@mui/icons-material';
import { courtsData, searchCourts } from '../data/courts';
import CourtCard from '../components/CourtCard';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourts, setFilteredCourts] = useState(courtsData);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    surface: [],
    hasLights: false,
    isIndoor: false,
    minRating: 0,
    priceRange: [0, 50]
  });
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredCourts(courtsData);
    } else {
      const results = searchCourts(query);
      setFilteredCourts(results);
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // In a real app, you would filter courts based on the tab
    // For now, we'll just show all courts
    setFilteredCourts(courtsData);
  };

  // Handle sort menu
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (value) => {
    setAnchorEl(null);
    if (value) {
      setSortBy(value);
      // In a real app, you would sort the courts based on the selected value
      // For now, we'll just log the selected sort option
      console.log('Sort by:', value);
    }
  };

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  // Handle court click
  const handleCourtClick = (courtId) => {
    navigate(`/court/${courtId}`);
  };

  // Get unique surfaces for filters
  const uniqueSurfaces = [...new Set(courtsData.map(court => court.surface))];

  // Apply filters
  useEffect(() => {
    let results = [...courtsData];

    // Apply search query
    if (searchQuery.trim() !== '') {
      results = searchCourts(searchQuery);
    }

    // Apply surface filter
    if (filters.surface.length > 0) {
      results = results.filter(court => filters.surface.includes(court.surface));
    }

    // Apply lights filter
    if (filters.hasLights) {
      results = results.filter(court => court.lights);
    }

    // Apply indoor/outdoor filter
    if (filters.isIndoor) {
      results = results.filter(court => court.indoor);
    }

    // Apply rating filter
    if (filters.minRating > 0) {
      results = results.filter(court => court.rating >= filters.minRating);
    }

    // Apply price range filter
    results = results.filter(
      court => court.price >= filters.priceRange[0] && court.price <= filters.priceRange[1]
    );

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc':
          return b.rating - a.rating;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'reviews-desc':
          return b.reviewCount - a.reviewCount;
        default: // recommended
          // A simple recommendation algorithm (can be improved)
          const scoreA = (a.rating * 2) + (a.reviewCount / 100) - (a.price / 5);
          const scoreB = (b.rating * 2) + (b.reviewCount / 100) - (b.price / 5);
          return scoreB - scoreA;
      }
    });

    setFilteredCourts(results);
  }, [searchQuery, filters, sortBy]);

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      surface: [],
      hasLights: false,
      isIndoor: false,
      minRating: 0,
      priceRange: [0, 50]
    });
    setSearchQuery('');
    setSortBy('recommended');
  };

  // Check if any filter is active
  const isAnyFilterActive = 
    filters.surface.length > 0 || 
    filters.hasLights || 
    filters.isIndoor || 
    filters.minRating > 0 ||
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 50;

  return (
    <Container maxWidth="md" disableGutters>
      {/* Header with search */}
      <Box sx={{ p: 2, position: 'sticky', top: 0, zIndex: 10, bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Find Tennis Courts</Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, location, or surface..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setSearchQuery('');
                      setFilteredCourts(courtsData);
                    }}
                    size="small"
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { bgcolor: 'background.paper' }
            }}
          />
          
          <Button 
            variant="outlined" 
            sx={{ minWidth: 'auto', px: 2 }}
            onClick={toggleMobileFilters}
            startIcon={<Tune />}
          >
            Filters
          </Button>
        </Box>
        
        {/* Active filters */}
        {isAnyFilterActive && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            {filters.surface.map(surface => (
              <Chip
                key={surface}
                label={surface}
                size="small"
                onDelete={() => {
                  setFilters(prev => ({
                    ...prev,
                    surface: prev.surface.filter(s => s !== surface)
                  }));
                }}
                deleteIcon={<Close fontSize="small" />}
              />
            ))}
            
            {filters.hasLights && (
              <Chip
                label="Lights"
                size="small"
                onDelete={() => setFilters(prev => ({ ...prev, hasLights: false }))}
                deleteIcon={<Close fontSize="small" />}
              />
            )}
            
            {filters.isIndoor && (
              <Chip
                label="Indoor"
                size="small"
                onDelete={() => setFilters(prev => ({ ...prev, isIndoor: false }))}
                deleteIcon={<Close fontSize="small" />}
              />
            )}
            
            {filters.minRating > 0 && (
              <Chip
                label={`${filters.minRating}+ Rating`}
                size="small"
                onDelete={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
                deleteIcon={<Close fontSize="small" />}
              />
            )}
            
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 50) && (
              <Chip
                label={`$${filters.priceRange[0]}-$${filters.priceRange[1]}/hr`}
                size="small"
                onDelete={() => setFilters(prev => ({ ...prev, priceRange: [0, 50] }))}
                deleteIcon={<Close fontSize="small" />}
              />
            )}
            
            <Button 
              size="small" 
              onClick={clearAllFilters}
              sx={{ ml: 'auto' }}
            >
              Clear all
            </Button>
          </Box>
        )}
      </Box>
      
      {/* Mobile filters panel */}
      {mobileFiltersOpen && (
        <Paper 
          sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 1200, 
            p: 2, 
            overflowY: 'auto' 
          }}
          elevation={3}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={toggleMobileFilters}>
              <Close />
            </IconButton>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Surface</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {uniqueSurfaces.map(surface => (
                <Chip
                  key={surface}
                  label={surface}
                  variant={filters.surface.includes(surface) ? 'filled' : 'outlined'}
                  color={filters.surface.includes(surface) ? 'primary' : 'default'}
                  onClick={() => {
                    setFilters(prev => ({
                      ...prev,
                      surface: prev.surface.includes(surface)
                        ? prev.surface.filter(s => s !== surface)
                        : [...prev.surface, surface]
                    }));
                  }}
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Facilities</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  p: 1,
                  borderRadius: 1,
                  bgcolor: filters.hasLights ? 'action.selected' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' },
                  cursor: 'pointer'
                }}
                onClick={() => setFilters(prev => ({ ...prev, hasLights: !prev.hasLights }))}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 24, height: 24, display: 'flex', justifyContent: 'center', mr: 2 }}>
                    <span>💡</span>
                  </Box>
                  <Typography>Has Lights</Typography>
                </Box>
                <input 
                  type="checkbox" 
                  checked={filters.hasLights} 
                  onChange={() => {}}
                  style={{ width: 18, height: 18 }}
                />
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  p: 1,
                  borderRadius: 1,
                  bgcolor: filters.isIndoor ? 'action.selected' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' },
                  cursor: 'pointer'
                }}
                onClick={() => setFilters(prev => ({ ...prev, isIndoor: !prev.isIndoor }))}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 24, height: 24, display: 'flex', justifyContent: 'center', mr: 2 }}>
                    <span>🏠</span>
                  </Box>
                  <Typography>Indoor Courts</Typography>
                </Box>
                <input 
                  type="checkbox" 
                  checked={filters.isIndoor} 
                  onChange={() => {}}
                  style={{ width: 18, height: 18 }}
                />
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Minimum Rating</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  onClick={() => setFilters(prev => ({ ...prev, minRating: star }))}
                  sx={{ p: 0.5 }}
                >
                  <Star 
                    fontSize="small" 
                    color={filters.minRating >= star ? 'primary' : 'disabled'} 
                  />
                </IconButton>
              ))}
              {filters.minRating > 0 && (
                <Typography variant="caption" sx={{ ml: 1 }}>
                  {filters.minRating}+ stars
                </Typography>
              )}
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Price Range (per hour)
            </Typography>
            <Box sx={{ px: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption">${filters.priceRange[0]}</Typography>
                <Typography variant="caption">${filters.priceRange[1]}+</Typography>
              </Box>
              <input
                type="range"
                min="0"
                max="50"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value);
                  setFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], newMax]
                  }));
                }}
                style={{ width: '100%' }}
              />
            </Box>
          </Box>
          
          <Button 
            variant="contained" 
            fullWidth 
            onClick={toggleMobileFilters}
            sx={{ mt: 2 }}
          >
            Show {filteredCourts.length} {filteredCourts.length === 1 ? 'Result' : 'Results'}
          </Button>
        </Paper>
      )}
      
      {/* Sort and filter bar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        px: 2,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        position: 'sticky',
        top: 120, // Adjust based on your header height
        zIndex: 5
      }}>
        <Typography variant="body2" color="text.secondary">
          {filteredCourts.length} {filteredCourts.length === 1 ? 'court' : 'courts'} found
        </Typography>
        
        <Button 
          size="small" 
          endIcon={<FilterList fontSize="small" />}
          onClick={handleSortClick}
          sx={{ textTransform: 'none' }}
        >
          Sort: {sortBy === 'recommended' ? 'Recommended' : 
                sortBy === 'rating-desc' ? 'Rating: High to Low' :
                sortBy === 'price-asc' ? 'Price: Low to High' :
                sortBy === 'price-desc' ? 'Price: High to Low' : 'Reviews'}
        </Button>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleSortClose(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem 
            selected={sortBy === 'recommended'}
            onClick={() => handleSortClose('recommended')}
          >
            Recommended
          </MenuItem>
          <MenuItem 
            selected={sortBy === 'rating-desc'}
            onClick={() => handleSortClose('rating-desc')}
          >
            Rating: High to Low
          </MenuItem>
          <MenuItem 
            selected={sortBy === 'price-asc'}
            onClick={() => handleSortClose('price-asc')}
          >
            Price: Low to High
          </MenuItem>
          <MenuItem 
            selected={sortBy === 'price-desc'}
            onClick={() => handleSortClose('price-desc')}
          >
            Price: High to Low
          </MenuItem>
          <MenuItem 
            selected={sortBy === 'reviews-desc'}
            onClick={() => handleSortClose('reviews-desc')}
          >
            Most Reviewed
          </MenuItem>
        </Menu>
      </Box>
      
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          position: 'sticky',
          top: 160, // Adjust based on your header and filter bar height
          zIndex: 5,
          bgcolor: 'background.default'
        }}
      >
        <Tab label="All" value="all" />
        <Tab label="Nearby" value="nearby" />
        <Tab label="Top Rated" value="top-rated" />
        <Tab label="Indoor" value="indoor" />
        <Tab label="Outdoor" value="outdoor" />
      </Tabs>
      
      {/* Court list */}
      <Box sx={{ p: 2 }}>
        {filteredCourts.length > 0 ? (
          filteredCourts.map((court) => (
            <Box key={court.id} sx={{ mb: 3 }}>
              <CourtCard court={court} onClick={() => handleCourtClick(court.id)} />
            </Box>
          ))
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '50vh',
            textAlign: 'center',
            p: 3
          }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              bgcolor: 'action.hover', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 2
            }}>
              <Search color="disabled" fontSize="large" />
            </Box>
            <Typography variant="h6" gutterBottom>No courts found</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try adjusting your search or filters to find what you're looking for.
            </Typography>
            <Button 
              variant="outlined" 
              onClick={clearAllFilters}
            >
              Clear all filters
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
