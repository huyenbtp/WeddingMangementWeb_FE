import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Link, FormControlLabel, Checkbox, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        
        if (!phoneNumber.trim()) {
            setPhoneError('Vui lòng nhập số điện thoại');
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (!password.trim()) {
            setPasswordError('Vui lòng nhập mật khẩu');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleLogin = () => {
        if (validateForm()) {
            console.log('Số điện thoại:', phoneNumber);
            console.log('Mật khẩu:', password);
            console.log('Duy trì đăng nhập:', rememberMe);
            // Logic xử lý đăng nhập sẽ được thêm ở đây sau này
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                }}
            >
                <Typography component="h1" variant="h5">
                    Đăng Nhập
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Số điện thoại"
                        name="phoneNumber"
                        autoComplete="tel"
                        autoFocus
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (phoneError) setPhoneError('');
                        }}
                        error={!!phoneError}
                        helperText={phoneError}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (passwordError) setPasswordError('');
                        }}
                        error={!!passwordError}
                        helperText={passwordError}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%',
                            mt: 1,
                            mb: 2,
                            alignItems: 'center',
                        }}
                    >
                        {/* Đã xóa Duy trì đăng nhập và Quên mật khẩu */}
                    </Box>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 1,
                            mb: 2,
                            bgcolor: '#4880FF',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: '#3660CC',
                            },
                        }}
                        onClick={handleLogin}
                    >
                        Đăng Nhập
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        Bạn chưa có tài khoản?
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/register')}
                            sx={{ color: '#4880FF' }}
                        >
                            Đăng ký
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage; 