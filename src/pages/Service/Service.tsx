import { useState, useEffect } from 'react';
import { serviceList, Service as ServiceType } from './serviceData';
import './Service.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ServiceAddDialog from './ServiceAddDialog.tsx';
import ServiceEditDialog from './ServiceEditDialog.tsx';
import ConfirmDelete from '../../components/Alert/ConfirmDelete/ConfirmDelete';
import ServiceDetailMenu from '../../components/Menu/ServiceDetailMenu';

export default function Service() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [openAddServiceDialog, setOpenAddServiceDialog] = useState<boolean>(false);
    const [openEditServiceDialog, setOpenEditServiceDialog] = useState<boolean>(false);
    const [serviceToEdit, setServiceToEdit] = useState<ServiceType | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [serviceToDelete, setServiceToDelete] = useState<ServiceType | null>(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
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

    const handleEditClick = (service: ServiceType) => {
        setServiceToEdit(service);
        setOpenEditServiceDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditServiceDialog(false);
        setServiceToEdit(null);
    };

    const handleDeleteClick = (service: ServiceType) => {
        setServiceToDelete(service);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setServiceToDelete(null);
    };

    const handleConfirmDelete = () => {
        // TODO: Xử lý xóa dịch vụ ở đây
        setOpenDeleteDialog(false);
        setServiceToDelete(null);
    };

    const handleServiceClick = (service: ServiceType) => {
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

    return (
        <Box sx={{ background: '#f5f6fa', minHeight: '100vh', p: 0 }}>
            <Box sx={{ background: '#fff', borderRadius: 3, p: 3, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', maxWidth: 1400, mx: 'auto', width: '100%' }}>
                <Box sx={{ height: '100vh', overflowY: 'auto', pr: 2 }}>
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
                        {filteredServices.map((service: ServiceType) => (
                            <Card
                                key={service.id}
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
                                onClick={() => handleServiceClick(service)}
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    display: 'flex',
                                    gap: 1,
                                    zIndex: 2,
                                }} onClick={e => e.stopPropagation()}>
                                    <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleEditClick(service)}>
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
                                    <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleDeleteClick(service)}>
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
                                            <DeleteIcon fontSize="small" sx={{ color: '#ff0000', opacity: 0.85, transition: 'opacity 0.2s' }} />
                                        </Box>
                                    </Button>
                                </Box>
                                <CardMedia
                                    component="img"
                                    image={service.image}
                                    alt={service.name}
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
                                        {service.name}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem', lineHeight: 1.5 }}>
                                        {service.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Giá: {service.price.toLocaleString('vi-VN')} VNĐ
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
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
