import { useState } from 'react';
import { serviceList, Service as ServiceType } from './serviceData';
import './Service.css';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Service() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [openAddServiceForm, setOpenAddServiceForm] = useState(false);

    const [newServiceName, setNewServiceName] = useState('');
    const [newServiceDescription, setNewServiceDescription] = useState('');
    const [newServicePrice, setNewServicePrice] = useState<number | ''>('');
    const [newServiceCategory, setNewServiceCategory] = useState('');
    const [newServiceImage, setNewServiceImage] = useState('');
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

    const categories = ['Tất cả', 'Trang Trí', 'MC & Ca Sĩ', 'Quay Chụp', 'Làm Đẹp', 'Trang Phục', 'Phương Tiện', 'Thiệp & Quà', 'Bánh & Rượu', 'An Ninh'];

    const filteredServices = selectedCategory === 'Tất cả' 
        ? serviceList 
        : serviceList.filter(service => service.category === selectedCategory);

    const handleOpenAddServiceForm = () => {
        setOpenAddServiceForm(true);
    };

    const handleCloseAddServiceForm = () => {
        setOpenAddServiceForm(false);
        setNewServiceName('');
        setNewServiceDescription('');
        setNewServicePrice('');
        setNewServiceCategory('');
        setNewServiceImage('');
        setSelectedImageFile(null);
    };

    const handleAddServiceSubmit = () => {
        console.log('Adding new service:', {
            name: newServiceName,
            description: newServiceDescription,
            price: newServicePrice,
            category: newServiceCategory,
            image: newServiceImage,
        });
        handleCloseAddServiceForm();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewServiceImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImageFile(null);
            setNewServiceImage('');
        }
    };

    return (
        <div className="service-container">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <h2>Dịch Vụ Đám Cưới</h2>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddServiceForm}
                    sx={{ backgroundColor: '#4880FF', '&:hover': { backgroundColor: '#000000' } }}
                >
                    Thêm dịch vụ mới
                </Button>
            </Box>
            
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

            {/* Add New Service Form Dialog */}
            <Dialog
                open={openAddServiceForm}
                onClose={handleCloseAddServiceForm}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Thêm dịch vụ mới</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            label="Tên dịch vụ"
                            value={newServiceName}
                            onChange={(e) => setNewServiceName(e.target.value)}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Mô tả"
                            value={newServiceDescription}
                            onChange={(e) => setNewServiceDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                        />
                        <TextField
                            label="Giá (VNĐ)"
                            type="number"
                            value={newServicePrice}
                            onChange={(e) => setNewServicePrice(Number(e.target.value))}
                            fullWidth
                            size="small"
                        />
                        <FormControl fullWidth size="small">
                            <InputLabel>Danh mục</InputLabel>
                            <Select
                                value={newServiceCategory}
                                label="Danh mục"
                                onChange={(e) => setNewServiceCategory(e.target.value as string)}
                            >
                                {categories.filter(cat => cat !== 'Tất cả').map(cat => (
                                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 1, mb: 1, backgroundColor: '#6c757d', '&:hover': { backgroundColor: '#5a6268' } }}
                        >
                            Chọn hình ảnh
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>
                        {newServiceImage && (
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <img src={newServiceImage} alt="Xem trước hình ảnh" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                            <Button variant="outlined" onClick={handleCloseAddServiceForm}>
                                Hủy
                            </Button>
                            <Button variant="contained" onClick={handleAddServiceSubmit} sx={{ backgroundColor: '#4880FF', '&:hover': { backgroundColor: '#000000' } }}>
                                Thêm dịch vụ
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
