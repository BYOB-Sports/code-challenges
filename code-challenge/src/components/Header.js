import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeToggleButton from './ThemeToggleButton'; // Make sure the path is correct

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="div" fontWeight="bold">
            Tennis Courts
          </Typography>
        </Box>
        {/* The ThemeToggleButton is placed here for a consistent UI. */}
        <ThemeToggleButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;