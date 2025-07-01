import { useState, useEffect } from 'react';
import { serviceList } from './serviceData';
import { IService } from '../../interfaces/service.interface';
import './Service.css';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceAddDialog from './ServiceAddDialog.tsx';
import ServiceEditDialog from './ServiceEditDialog.tsx';
import ConfirmDelete from '../../components/Alert/ConfirmDelete/ConfirmDelete';
import ServiceDetailMenu from '../../components/Menu/ServiceDetailMenu';
import PetalAnimation from '../../components/Animations/PetalAnimation';
import InfoCard from '../../components/Card/InfoCard';
import SearchBar from '../../components/SearchBar';
import AddHallButton from '../../components/Card/AddHallButton';

export default function Service() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [openAddServiceDialog, setOpenAddServiceDialog] = useState<boolean>(false);
    const [openEditServiceDialog, setOpenEditServiceDialog] = useState<boolean>(false);
    const [serviceToEdit, setServiceToEdit] = useState<IService | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<IService | null>(null);
    const [searchKey, setSearchKey] = useState("");
    const categories = ['Tất cả', 'Trang Trí', 'MC & Ca Sĩ', 'Quay Chụp', 'Làm Đẹp', 'Trang Phục', 'Phương Tiện', 'Thiệp & Quà', 'Bánh & Rượu', 'An Ninh'];

    const filteredServices = serviceList.filter(service => {
        const matchesCategory = selectedCategory === 'Tất cả' || service.category === selectedCategory;
        const matchesSearch = service.name.toLowerCase().includes(searchKey.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleOpenAddServiceDialog = () => {
        setOpenAddServiceDialog(true);
    };

    const handleCloseAddServiceDialog = () => {
        setOpenAddServiceDialog(false);
    };

    const handleEditClick = (service: IService) => {
        setServiceToEdit(service);
        setOpenEditServiceDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditServiceDialog(false);
        setServiceToEdit(null);
    };

    const handleDeleteClick = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        setOpenDeleteDialog(false);
    };

    const handleServiceClick = (service: IService) => {
        setSelectedService(service);
        setDetailDialogOpen(true);
    };

    const handleCloseDetailDialog = () => {
        setDetailDialogOpen(false);
        setSelectedService(null);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <Box sx={{ background: '#f5f6fa', minHeight: '100vh', p: 0, position: 'relative', overflow: 'hidden' }}>
            <PetalAnimation />
            <Box sx={{ background: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(2px)', borderRadius: 3, p: 3, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', maxWidth: 1400, mx: 'auto', width: '100%', position: 'relative', zIndex: 1 }}>
                <Box sx={{ height: '100vh', overflowY: 'auto', pr: 2 }}>
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
                        Dịch Vụ Đám Cưới
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
                            onClick={handleOpenAddServiceDialog}
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
                            Thêm dịch vụ
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
                        variants={containerVariants}
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
                            {filteredServices.map((service: IService) => (
                                <Box
                                    component={motion.div}
                                    key={service.id}
                                    layout
                                    variants={itemVariants}
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
                                        title={service.name}
                                        image={service.image}
                                        description={service.description}
                                        price={`Giá: ${service.price.toLocaleString('vi-VN')} VNĐ`}
                                        onCardClick={() => handleServiceClick(service)}
                                        onEditClick={() => handleEditClick(service)}
                                        onDeleteClick={() => handleDeleteClick()}
                                    />
                                </Box>
                            ))}
                        </AnimatePresence>
                    </Box>

                    <ServiceAddDialog
                        open={openAddServiceDialog}
                        onClose={handleCloseAddServiceDialog}
                        onSave={() => {}}
                        categories={categories}
                    />
                    <ServiceEditDialog
                        open={openEditServiceDialog}
                        onClose={handleCloseEditDialog}
                        service={serviceToEdit}
                        categories={categories}
                    />
                    <ConfirmDelete
                        open={openDeleteDialog}
                        onClose={handleCloseDeleteDialog}
                        onConfirm={handleConfirmDelete}
                    />
                    {selectedService && (
                        <ServiceDetailMenu
                            open={detailDialogOpen}
                            onClose={handleCloseDetailDialog}
                            initialData={selectedService}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
}
