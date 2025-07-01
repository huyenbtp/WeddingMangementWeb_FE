import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Dialog,
    TextField,
    MenuItem,
} from "@mui/material";
import ConfirmDelete from '../../components/Alert/ConfirmDelete/ConfirmDelete';
import AddHallDialog from './AddHallDialog.tsx';
import EditHallDialog from './EditHallDialog.tsx';
import { hallInfo } from './hallInfo.mock';
import { IHall } from '../../interfaces/hall.interface';
import InfoCard from "../../components/Card/InfoCard.tsx";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddHallButton from '../../components/Card/AddHallButton';
import SearchBar from '../../components/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import PetalAnimation from '../../components/Animations/PetalAnimation';
import { filterHalls } from '../../components/Filter/hallFilter';

export default function HallPage() {
    const [selectedHall, setSelectedHall] = useState<{name: string, details: IHall} | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [openAddHallDialog, setOpenAddHallDialog] = useState<boolean>(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [openEditHallDialog, setOpenEditHallDialog] = useState<boolean>(false);
    const [hallToEdit, setHallToEdit] = useState<{name: string, details: IHall} | null>(null);

    const handleHallClick = (name: string, details: IHall) => {
        setSelectedHall({ name, details });
    };

    const handleCloseDialog = () => {
        setSelectedHall(null);
    };

    const handleOpenAddHallDialog = () => {
        setOpenAddHallDialog(true);
    };

    const handleCloseAddHallDialog = () => {
        setOpenAddHallDialog(false);
    };

    const handleDeleteClick = () => {
        setOpenConfirmDelete(true);
    };

    const handleCloseConfirmDelete = () => {
        setOpenConfirmDelete(false);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleEditClick = (details: IHall) => {
        setHallToEdit({ name: '', details });
        setOpenEditHallDialog(true);
    };

    const handleCloseEditHallDialog = () => {
        setOpenEditHallDialog(false);
        setHallToEdit(null);
    };
    
    const filteredHalls = filterHalls(hallInfo, selectedType, searchQuery);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const hallTypes = ["A", "B", "C", "D", "E"];

    const handleConfirmDelete = () => {
        setOpenConfirmDelete(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '20px',
            boxSizing: 'border-box',
            position: 'relative',
        }}>
            <PetalAnimation />
            <Typography
                sx={{
                    userSelect: "none",
                    color: "var(--text-color)",
                    fontWeight: "bold",
                    fontSize: "32px",
                    marginBottom: "20px",
                }}
            >
                Danh sách sảnh
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, marginBottom: '20px' }}>
                <SearchBar
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{
                        height: '48px',
                        '& .MuiInputBase-root': {
                            height: '48px',
                            fontSize: '15px',
                            borderRadius: '10px',
                        },
                    }}
                />
                <TextField
                    select
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    placeholder="Loại sảnh"
                    sx={{
                        minWidth: 120,
                        borderRadius: '10px',
                        height: '48px',
                        '& .MuiInputBase-root': {
                            borderRadius: '10px',
                            height: '48px',
                            fontSize: '15px',
                            background: '#fff',
                        },
                    }}
                >
                    <MenuItem value="all">Tất cả</MenuItem>
                    {hallTypes.map((type) => (
                        <MenuItem key={type} value={type}>{`Loại ${type}`}</MenuItem>
                    ))}
                </TextField>
                <AddHallButton 
                    onClick={handleOpenAddHallDialog}
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
                />
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
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
                        {filteredHalls.map(([name, details]) => (
                            <Box
                                component={motion.div}
                                key={name}
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
                                    title={name}
                                    image={details.image}
                                    description={details.description}
                                    price={`Đơn giá bàn tối thiểu: ${details.minPrice.toLocaleString('vi-VN')} VNĐ | Tối đa: ${details.maxTables} bàn`}
                                    onCardClick={() => handleHallClick(name, details)}
                                    onEditClick={() => handleEditClick(details)}
                                    onDeleteClick={handleDeleteClick}
                                />
                            </Box>
                        ))}
                    </AnimatePresence>
                </Box>
            </Box>

            <Dialog
                open={selectedHall !== null}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                        p: 0,
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)',
                    }
                }}
            >
                {selectedHall && (
                        <Box>
                            <Box sx={{ width: '100%', height: 240, overflow: 'hidden' }}>
                                <img src={selectedHall.details.image} alt={selectedHall.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2a3b5d', mb: 1, textAlign: 'center' }}>
                                    {selectedHall.name}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TableRestaurantIcon sx={{ color: '#4880FF' }} />
                                        <Typography variant="body1">Loại: <b>{selectedHall.name.match(/([A-E])\d/)?.[1]}</b></Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AttachMoneyIcon sx={{ color: '#00b894' }} />
                                        <Typography variant="body1">Giá bàn: <b>{selectedHall.details.minPrice.toLocaleString('vi-VN')} VNĐ</b></Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TableRestaurantIcon sx={{ color: '#ff9800' }} />
                                        <Typography variant="body1">Tối đa: <b>{selectedHall.details.maxTables}</b> bàn</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#555', textAlign: 'center', mb: 2 }}>
                                    {selectedHall.details.description}
                                </Typography>
                            </Box>
                        </Box>
                )}
            </Dialog>

            <AddHallDialog open={openAddHallDialog} onClose={handleCloseAddHallDialog} hallTypes={hallTypes} />
            <EditHallDialog open={openEditHallDialog} onClose={handleCloseEditHallDialog} hall={hallToEdit?.name || ''} hallTypes={hallTypes} />

            <ConfirmDelete open={openConfirmDelete} onClose={handleCloseConfirmDelete} onConfirm={handleConfirmDelete} />
        </Box>
    );
}
