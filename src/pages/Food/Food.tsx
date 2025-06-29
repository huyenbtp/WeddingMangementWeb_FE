import { useState, useEffect } from 'react';
import { foodList, Food as FoodType } from './foodData';
import './Food.css';
import { Button, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import FoodAddDialog from './FoodAddDialog.tsx';
import ConfirmDelete from '../../components/Alert/ConfirmDelete/ConfirmDelete';
import EditIcon from '@mui/icons-material/Edit';
import FoodEditDialog from './FoodEditDialog.tsx';
import FoodDetailMenu from '../../components/Menu/FoodDetailMenu';

export default function Food() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
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
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [foodToDelete, setFoodToDelete] = useState<FoodType | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [foodToEdit, setFoodToEdit] = useState<FoodType | null>(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState<FoodType | null>(null);

    const filteredFoods = selectedCategory === 'Tất cả' 
        ? foodList 
        : foodList.filter(food => food.category === selectedCategory);

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
    const handleOpenAddDialog = () => {
        setAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleAddFood = (data: any) => {
        // Xử lý thêm món ăn mới ở đây
        // Ví dụ: thêm vào foodList hoặc state foods nếu có
        setAddDialogOpen(false);
    };

    const handleDeleteClick = (food: FoodType) => {
        setFoodToDelete(food);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        // Xử lý xóa món ăn ở đây
        setDeleteDialogOpen(false);
        setFoodToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setFoodToDelete(null);
    };

    const handleEditClick = (food: FoodType) => {
        setFoodToEdit(food);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setFoodToEdit(null);
    };

    const handleFoodClick = (food: FoodType) => {
        setSelectedFood(food);
        setDetailDialogOpen(true);
    };

    const handleCloseDetailDialog = () => {
        setDetailDialogOpen(false);
        setSelectedFood(null);
    };

    return (
        <Box sx={{ background: '#f5f6fa', minHeight: '100vh', p: 0 }}>
            <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', maxWidth: 1400, mx: 'auto', width: '100%' }}>
                <Box sx={{ height: '100vh', overflowY: 'auto', pr: 2 }}>
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
                                onClick={handleOpenAddDialog}
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

                        <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 3,
                            '& > *': {
                                flex: '0 1 calc(25% - 18px)',
                                minWidth: '240px',
                                maxWidth: '1fr',
                            }
                        }}>
                            {filteredFoods.map((food: FoodType) => (
                                <Card
                                    key={food.id}
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        borderRadius: 12,
                                        backgroundColor: '#fff',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                        },
                                        position: 'relative',
                                    }}
                                    onClick={() => handleFoodClick(food)}
                                >
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        display: 'flex',
                                        gap: 1,
                                        zIndex: 2,
                                    }} onClick={e => e.stopPropagation()}>
                                        <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleEditClick(food)}>
                                            <Box
                                                sx={{
                                                    bgcolor: '#fff',
                                                    borderRadius: '50%',
                                                    p: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                    transition: 'background 0.2s, box-shadow 0.2s',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        bgcolor: '#f0f0f0',
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                                                        '& .MuiSvgIcon-root': { opacity: 1 }
                                                    }
                                                }}
                                            >
                                                <EditIcon fontSize="small" sx={{ color: '#00e1ff', opacity: 0.85, transition: 'opacity 0.2s' }} />
                                            </Box>
                                        </Button>
                                        <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleDeleteClick(food)}>
                                            <Box
                                                sx={{
                                                    bgcolor: '#fff',
                                                    borderRadius: '50%',
                                                    p: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                    transition: 'background 0.2s, box-shadow 0.2s',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        bgcolor: '#f0f0f0',
                                                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                                                        '& .MuiSvgIcon-root': { opacity: 1 }
                                                    }
                                                }}
                                            >
                                                <DeleteOutline fontSize="small" sx={{ color: '#ff0000', opacity: 0.85, transition: 'opacity 0.2s' }} />
                                            </Box>
                                        </Button>
                                    </Box>
                                    <CardMedia
                                        component="img"
                                        image={food.image}
                                        alt={food.name}
                                        sx={{
                                            width: '100%',
                                            objectFit: 'cover',
                                            height: 220,
                                            borderTopLeftRadius: 12,
                                            borderTopRightRadius: 12,
                                        }}
                                    />
                                    <CardContent sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.5rem' }}>
                                            {food.name}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem', lineHeight: 1.5 }}>
                                            {food.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Giá: {food.price.toLocaleString('vi-VN')} VNĐ
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>

                        <FoodAddDialog
                            open={addDialogOpen}
                            onClose={handleCloseAddDialog}
                            onSave={handleAddFood}
                            categories={categories}
                        />
                        <ConfirmDelete
                            open={deleteDialogOpen}
                            onClose={handleDeleteCancel}
                            onConfirm={handleDeleteConfirm}
                        />
                        <FoodEditDialog
                            open={editDialogOpen}
                            onClose={handleCloseEditDialog}
                            food={foodToEdit}
                            categories={categories}
                        />
                        {selectedFood && (
                            <FoodDetailMenu
                                open={detailDialogOpen}
                                onClose={handleCloseDetailDialog}
                                initialData={selectedFood}
                            />
                        )}
                    </div>
                </Box>
            </Box>
        </Box>
    );
}
