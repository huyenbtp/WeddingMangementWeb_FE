import { useState } from 'react';
import { serviceList, Service as ServiceType } from './serviceData';
import './Service.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Service() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [openAddServiceDialog, setOpenAddServiceDialog] = useState<boolean>(false);
    const categories = ['Tất cả', 'Trang Trí', 'MC & Ca Sĩ', 'Quay Chụp', 'Làm Đẹp', 'Trang Phục', 'Phương Tiện', 'Thiệp & Quà', 'Bánh & Rượu', 'An Ninh'];

    const filteredServices = selectedCategory === 'Tất cả' 
        ? serviceList 
        : serviceList.filter(service => service.category === selectedCategory);

    const handleOpenAddServiceDialog = () => {
        setOpenAddServiceDialog(true);
    };

    const handleCloseAddServiceDialog = () => {
        setOpenAddServiceDialog(false);
    };

    return (
        <div className="service-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Dịch Vụ Đám Cưới</h2>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                        whiteSpace: 'nowrap',
                        borderRadius: '50px',
                        backgroundColor: '#4880FF',
                        '&:hover': {
                            backgroundColor: '#3a66cc',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        },
                    }}
                    onClick={handleOpenAddServiceDialog}
                >
                    Thêm dịch vụ
                </Button>
            </div>
            
            <div className="category-filter">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="service-grid">
                {filteredServices.map((service: ServiceType) => (
                    <div key={service.id} className="service-card">
                        <img src={service.image} alt={service.name} className="service-image" />
                        <div className="service-info">
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                            <p className="service-price">{service.price.toLocaleString('vi-VN')} VNĐ</p>
                            <button className="select-btn">Chọn dịch vụ</button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog
                open={openAddServiceDialog}
                onClose={handleCloseAddServiceDialog}
                maxWidth="sm"
                fullWidth
                BackdropProps={{
                    style: { backdropFilter: 'blur(5px)' }
                }}
            >
                <DialogTitle>Thêm dịch vụ mới</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Tên dịch vụ" variant="outlined" fullWidth />
                    <FormControl fullWidth>
                        <InputLabel>Danh mục</InputLabel>
                        <Select label="Danh mục">
                            {categories.filter(cat => cat !== 'Tất cả').map(category => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Mô tả" variant="outlined" multiline rows={4} fullWidth />
                    <TextField label="Giá" variant="outlined" type="number" fullWidth />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button onClick={handleCloseAddServiceDialog} color="secondary">
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={handleCloseAddServiceDialog}>
                            Lưu
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
