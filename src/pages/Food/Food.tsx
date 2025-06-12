import { useState } from 'react';
import { foodList, Food as FoodType } from './foodData';
import './Food.css';
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

export default function Food() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [openAddFoodForm, setOpenAddFoodForm] = useState(false);

    const [newFoodName, setNewFoodName] = useState('');
    const [newFoodDescription, setNewFoodDescription] = useState('');
    const [newFoodPrice, setNewFoodPrice] = useState<number | ''>('');
    const [newFoodCategory, setNewFoodCategory] = useState('');
    const [newFoodImage, setNewFoodImage] = useState('');
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

    const categories = ['Tất cả', 'Món Khai Vị', 'Món Chính', 'Món Súp', 'Món Xào', 'Món Cơm', 'Món Ăn Kèm'];

    const filteredFoods = selectedCategory === 'Tất cả' 
        ? foodList 
        : foodList.filter(food => food.category === selectedCategory);

    const handleOpenAddFoodForm = () => {
        setOpenAddFoodForm(true);
    };

    const handleCloseAddFoodForm = () => {
        setOpenAddFoodForm(false);
        setNewFoodName('');
        setNewFoodDescription('');
        setNewFoodPrice('');
        setNewFoodCategory('');
        setNewFoodImage('');
        setSelectedImageFile(null);
    };

    const handleAddFoodSubmit = () => {
        console.log('Adding new food:', {
            name: newFoodName,
            description: newFoodDescription,
            price: newFoodPrice,
            category: newFoodCategory,
            image: newFoodImage,
        });
        handleCloseAddFoodForm();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewFoodImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImageFile(null);
            setNewFoodImage('');
        }
    };

    return (
        <div className="food-container">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <h2>Danh Sách Món Ăn</h2>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddFoodForm}
                    sx={{ backgroundColor: '#4880FF', '&:hover': { backgroundColor: '#000000' } }}
                >
                    Thêm món ăn mới
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

            {/* Add New Food Form Dialog */}
            <Dialog
                open={openAddFoodForm}
                onClose={handleCloseAddFoodForm}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Thêm món ăn mới</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            label="Tên món ăn"
                            value={newFoodName}
                            onChange={(e) => setNewFoodName(e.target.value)}
                            fullWidth
                            size="small"
                        />
                        <TextField
                            label="Mô tả"
                            value={newFoodDescription}
                            onChange={(e) => setNewFoodDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                        />
                        <TextField
                            label="Giá (VNĐ)"
                            type="number"
                            value={newFoodPrice}
                            onChange={(e) => setNewFoodPrice(Number(e.target.value))}
                            fullWidth
                            size="small"
                        />
                        <FormControl fullWidth size="small">
                            <InputLabel>Danh mục</InputLabel>
                            <Select
                                value={newFoodCategory}
                                label="Danh mục"
                                onChange={(e) => setNewFoodCategory(e.target.value as string)}
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
                        {newFoodImage && (
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <img src={newFoodImage} alt="Xem trước hình ảnh" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                            <Button variant="outlined" onClick={handleCloseAddFoodForm}>
                                Hủy
                            </Button>
                            <Button variant="contained" onClick={handleAddFoodSubmit} sx={{ backgroundColor: '#4880FF', '&:hover': { backgroundColor: '#000000' } }}>
                                Thêm món
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
