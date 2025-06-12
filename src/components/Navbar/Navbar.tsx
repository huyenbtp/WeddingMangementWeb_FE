import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    navigate('/');
  };

  return (
    <Box className={styles.navbarContainer}>
      <Box className={styles.navbarContent}>
        {/* This box is for potential left-aligned content if needed in the future */}
      </Box>
      {loggedInUser ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <User size={20} />
          <Typography variant="h6" className={styles.loggedInUser}>
            {loggedInUser}
          </Typography>
          <Button variant="outlined" onClick={handleLogout} className={styles.logoutButton}>
            Đăng xuất
          </Button>
        </Box>
      ) : (
        <Typography variant="h6" className={styles.brandName}>
          H.Tuấn
        </Typography>
      )}
    </Box>
  );
} 