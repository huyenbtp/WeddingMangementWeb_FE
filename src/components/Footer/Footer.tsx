import React from 'react';
import { Box, Typography } from '@mui/material';
import { Github, Phone } from 'lucide-react';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <Box className={classes.footerContainer}>
      <Typography variant="body2" className={classes.websiteInfo}>
        <Github size={16} /> nguyenhoangtuan123
      </Typography>
      <Typography variant="body2" className={classes.websiteInfo}>
        <Github size={16} /> huyenbtp
      </Typography>
      <Typography variant="body2" className={classes.phoneInfo}>
        <Phone size={16} /> 0862318328
      </Typography>
    </Box>
  );
} 