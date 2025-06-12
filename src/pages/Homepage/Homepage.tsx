import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Homepage.module.css';
import Footer from '../../components/Footer/Footer';
import weddingImage from '../../assets/ảnh cưới.jpg';
import illustrationImage from '../../assets/ảnh cưới.jpg';

export default function Homepage() {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginClose = () => {
    setOpenLoginDialog(false);
    setPhoneNumber('');
    setPassword('');
  };

  const handleLoginSubmit = () => {
    if (phoneNumber === '0862318328' && password === 'tuan123456') {
      // Mock successful login
      console.log('Login successful');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUser', phoneNumber);
      handleLoginClose();
      navigate('/blank-page'); // Navigate to blank page
    } else {
      console.log('Invalid credentials');
      alert('Số điện thoại hoặc mật khẩu không đúng!');
    }
  };

  return (
    <Box className={classes.homepageContainer}>
      <Box className={classes.logoContainer}>
        {/* Placeholder for Sapo logo */}
        <Typography variant="h3" component="h1" className={classes.sapoLogo}>SE<span className={classes.sapoLogoBlue}>104</span></Typography>
      </Box>
      <Typography variant="h5" component="p" className={classes.sapoDescription}>
        Website đăng ký tiệc cưới
      </Typography>
      <Box className={classes.imagePlaceholder}>
        {/* Placeholder for the illustration */}
        <img src={illustrationImage} alt="Illustration" className={classes.illustrationImage} />
      </Box>
      <Typography variant="h6" component="p" className={classes.sapoCallToAction}>
        Tạo tiệc cưới cho bạn và ny của bạn
        <br />
        Ngay trong tầm tay
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.employeeLoginButton}
        onClick={handleLoginOpen}
      >
        Đăng nhập nhân viên
      </Button>
      <Button
        variant="text"
        color="primary"
        size="large"
        className={classes.managerLoginButton}
        onClick={handleLoginOpen}
      >
        Đăng nhập quản lý
      </Button>
      <Footer />

      <Dialog open={openLoginDialog} onClose={handleLoginClose}>
        <DialogTitle>Đăng nhập</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Số điện thoại"
            type="tel"
            fullWidth
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Mật khẩu"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose}>Hủy</Button>
          <Button onClick={handleLoginSubmit}>Đăng nhập</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 