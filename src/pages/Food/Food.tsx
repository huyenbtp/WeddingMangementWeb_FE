import { useState } from 'react';
import { foodList, Food as FoodType } from './foodData';
import './Food.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Food() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [openDialog, setOpenDialog] = useState(false);
    const [newFood, setNewFood] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null as File | null,
    });
    const categories = ['Tất cả', 'Món Khai Vị', 'Món Chính', 'Món Súp', 'Món Xào', 'Món Cơm', 'Món Ăn Kèm'];

    const filteredFoods = selectedCategory === 'Tất cả' 
        ? foodList 
        : foodList.filter(food => food.category === selectedCategory);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewFood({
            name: '',
            description: '',
            price: '',
            category: '',
            image: null,
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewFood(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewFood(prev => ({
                ...prev,
                image: e.target.files![0],
            }));
        }
    };

    const handleSubmit = () => {
        // Xử lý thêm món ăn mới ở đây
        console.log('New food:', newFood);
        handleCloseDialog();
    };

    return (
        <div className="food-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Danh Sách Món Ăn</h2>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                        bgcolor: '#4880FF',
                        '&:hover': {
                            bgcolor: '#3660CC',
                        },
                    }}
                    onClick={handleOpenDialog}
                >
                    Thêm món ăn
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

            <div className="food-grid">
                {filteredFoods.map((food: FoodType) => (
                    <div key={food.id} className="food-card">
                        <img src={food.image} alt={food.name} className="food-image" />
                        <div className="food-info">
                            <h3>{food.name}</h3>
                            <p>{food.description}</p>
                            <p className="food-price">{food.price.toLocaleString('vi-VN')} VNĐ</p>
                            <button className="select-btn">Chọn món</button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth BackdropProps={{ style: { backdropFilter: 'blur(5px)' } }}>
                <DialogTitle>Thêm Món Ăn Mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Tên món ăn"
                        type="text"
                        fullWidth
                        value={newFood.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Mô tả"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={newFood.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Giá"
                        type="number"
                        fullWidth
                        value={newFood.price}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="category"
                        label="Danh mục"
                        select
                        fullWidth
                        value={newFood.category}
                        onChange={handleInputChange}
                    >
                        {categories.filter(cat => cat !== 'Tất cả').map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Tải ảnh món ăn
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Button>
                    {newFood.image && (
                        <p style={{ marginTop: '8px' }}>Đã chọn: {newFood.image.name}</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Thêm món
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
