import { useState, useEffect } from 'react';
import { foodList } from './foodData';
import { IFood } from '../../interfaces/food.interface';
import './Food.css';
import { Box, Typography } from '@mui/material';
import FoodAddDialog from './FoodAddDialog.tsx';
import FoodEditDialog from './FoodEditDialog.tsx';
import FoodDetailMenu from '../../components/Menu/FoodDetailMenu';
import InfoCard from '../../components/Card/InfoCard';
import SearchBar from '../../components/SearchBar';
import AddHallButton from '../../components/Card/AddHallButton';
import { motion, AnimatePresence } from 'framer-motion';
import PetalAnimation from '../../components/Animations/PetalAnimation';

export default function Food() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [foodToEdit, setFoodToEdit] = useState<IFood | null>(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedFood, setSelectedFood] = useState<IFood | null>(null);
    const [searchKey, setSearchKey] = useState("");

    const categories = ['Tất cả', 'Món Khai Vị', 'Món Chính', 'Món Súp', 'Món Xào', 'Món Cơm', 'Món Ăn Kèm'];

    const filteredFoods = foodList.filter(food => {
        const matchesCategory = selectedCategory === 'Tất cả' || food.category === selectedCategory;
        const matchesSearch = food.name.toLowerCase().includes(searchKey.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleOpenAddDialog = () => {
        setAddDialogOpen(true);
    };

    const handleCloseAddDialog = () => {
        setAddDialogOpen(false);
    };

    const handleAddFood = () => {
        setAddDialogOpen(false);
    };

    const handleEditClick = (food: IFood) => {
        setFoodToEdit(food);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setFoodToEdit(null);
    };

    const handleFoodClick = (food: IFood) => {
        setSelectedFood(food);
        setDetailDialogOpen(true);
    };

    const handleCloseDetailDialog = () => {
        setDetailDialogOpen(false);
        setSelectedFood(null);
    };

    return (
        <Box sx={{ background: '#f5f6fa', minHeight: '100vh', p: 0, position: 'relative', overflow: 'hidden' }}>
            <PetalAnimation />
            <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', maxWidth: 1400, mx: 'auto', width: '100%', position: 'relative', zIndex: 1 }}>
                <Box sx={{ height: '100vh', overflowY: 'auto', pr: 2 }}>
                    <div className="food-container">
                        <Typography
                            sx={{
                                userSelect: "none",
                                color: "var(--text-color)",
                                fontWeight: "bold",
                                fontSize: "32px",
                                marginBottom: "20px",
                                textAlign: 'left',
                            }}
                        >
                            Danh Sách Món Ăn
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, marginBottom: '20px', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <SearchBar
                                value={searchKey}
                                onChange={e => setSearchKey(e.target.value)}
                                sx={{
                                    height: '48px',
                                    '& .MuiInputBase-root': {
                                        height: '48px',
                                        fontSize: '15px',
                                        borderRadius: '10px',
                                    },
                                }}
                            />
                            <AddHallButton
                                onClick={handleOpenAddDialog}
                                sx={{
                                    height: '48px',
                                    padding: '0 20px',
                                    borderRadius: '10px',
                                    minWidth: 'unset',
                                    fontSize: '15px',
                                    boxShadow: 'none',
                                    lineHeight: 1.2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: '#4880FF !important',
                                    color: '#fff',
                                    filter: 'none',
                                    opacity: 1,
                                    '&:hover': {
                                        backgroundColor: '#3578f0 !important',
                                    },
                                }}
                            >
                                Thêm món ăn
                            </AddHallButton>
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

                        <Box
                            component={motion.div}
                            variants={{
                                hidden: { opacity: 1 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                            initial="hidden"
                            animate="visible"
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 3,
                                '& > *': {
                                    flex: '0 1 calc(25% - 18px)',
                                    minWidth: '240px',
                                    maxWidth: '1fr',
                                }
                            }}>
                            <AnimatePresence>
                                {filteredFoods.map((food: IFood) => (
                                    <Box
                                        component={motion.div}
                                        key={food.id}
                                        layout
                                        variants={{
                                            hidden: { y: 20, opacity: 0 },
                                            visible: { y: 0, opacity: 1 }
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        sx={{
                                            flex: '0 1 calc(25% - 18px)',
                                            minWidth: '240px',
                                            maxWidth: '1fr',
                                            height: '100%'
                                        }}
                                    >
                                        <InfoCard
                                            title={food.name}
                                            image={food.image}
                                            description={food.description}
                                            price={`Giá: ${food.price.toLocaleString('vi-VN')} VNĐ`}
                                            onCardClick={() => handleFoodClick(food)}
                                            onEditClick={() => handleEditClick(food)}
                                            onDeleteClick={() => {}}
                                        />
                                    </Box>
                                ))}
                            </AnimatePresence>
                        </Box>

                        <FoodAddDialog
                            open={addDialogOpen}
                            onClose={handleCloseAddDialog}
                            onSave={handleAddFood}
                            categories={categories}
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
