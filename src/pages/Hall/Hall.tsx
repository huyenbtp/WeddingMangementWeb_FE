import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Button,
    InputAdornment,
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ConfirmDelete from '../../components/Alert/ConfirmDelete/ConfirmDelete';
import AddHallDialog from './AddHallDialog.tsx';
import EditHallDialog from './EditHallDialog.tsx';
import { hallInfo, IHallInfo } from './hallInfo.mock';
import { IParty } from '../../interfaces/hall.interface';

// Mock data - you should replace this with actual data from your backend
const initialData: IParty[] = [
    {
        id: 1,
        groom: "Nguyễn Văn Nam",
        bride: "Trần Thị Lan",
        phone: "0912345678",
        date: "2025-06-15",
        shift: "Trưa",
        hall: "Grand Ballroom A1",
        type: "A",
        deposit: 10000000,
        tables: 1000000,
        reserveTables: 5,
        status: "Đã đặt cọc",
    },
    {
        id: 2,
        groom: "Lê Minh Quân",
        bride: "Phạm Thị Hạnh",
        phone: "0934567890",
        date: "2025-04-20",
        shift: "Tối",
        hall: "Crystal Hall A2",
        type: "A",
        deposit: 15000000,
        tables: 50,
        reserveTables: 3,
        status: "Đã tổ chức",
    },
    {
        id: 3,
        groom: "Trần Văn Hùng",
        bride: "Lê Thị Thảo",
        phone: "0901122334",
        date: "2025-06-25",
        shift: "Trưa",
        hall: "Diamond Suite A3",
        type: "A",
        deposit: 12000000,
        tables: 40,
        reserveTables: 2,
        status: "Đã huỷ",
    },
    {
        id: 4,
        groom: "Phan Thanh Tùng",
        bride: "Nguyễn Thị Mai",
        phone: "0911223344",
        date: "2025-07-01",
        shift: "Tối",
        hall: "Pearl Grand B1",
        type: "B",
        deposit: 20000000,
        tables: 70,
        reserveTables: 4,
        status: "Đã đặt cọc",
    },
    {
        id: 5,
        groom: "Đỗ Văn Lâm",
        bride: "Trần Thị Ngọc",
        phone: "0922334455",
        date: "2025-07-05",
        shift: "Trưa",
        hall: "Emerald Ballroom B2",
        type: "B",
        deposit: 11000000,
        tables: 35,
        reserveTables: 2,
        status: "Đã đặt cọc",
    },
    {
        id: 6,
        groom: "Ngô Minh Dũng",
        bride: "Võ Thị Thu",
        phone: "0933445566",
        date: "2025-07-10",
        shift: "Tối",
        hall: "Jade Terrace B3",
        type: "B",
        deposit: 18000000,
        tables: 65,
        reserveTables: 5,
        status: "Đã thanh toán",
    },
    {
        id: 7,
        groom: "Hoàng Văn Khánh",
        bride: "Đặng Thị Hương",
        phone: "0944556677",
        date: "2025-03-15",
        shift: "Trưa",
        hall: "Rose Garden C1",
        type: "C",
        deposit: 13000000,
        tables: 45,
        reserveTables: 3,
        status: "Đã tổ chức",
    },
    {
        id: 8,
        groom: "Vũ Thành Long",
        bride: "Nguyễn Thị Hồng",
        phone: "0955667788",
        date: "2025-03-20",
        shift: "Tối",
        hall: "Orchid Grand C2",
        type: "C",
        deposit: 17000000,
        tables: 60,
        reserveTables: 4,
        status: "Đã tổ chức",
    },
    {
        id: 9,
        groom: "Phạm Hữu Thắng",
        bride: "Trần Thị Yến",
        phone: "0966778899",
        date: "2025-07-25",
        shift: "Trưa",
        hall: "Lily Pavilion C3",
        type: "C",
        deposit: 14000000,
        tables: 55,
        reserveTables: 2,
        status: "Đã đặt cọc",
    },
    {
        id: 10,
        groom: "Lý Minh Phát",
        bride: "Huỳnh Thị Linh",
        phone: "0977889900",
        date: "2025-07-30",
        shift: "Tối",
        hall: "Eastern Charm D1",
        type: "D",
        deposit: 16000000,
        tables: 50,
        reserveTables: 3,
        status: "Đã thanh toán",
    },
    {
        id: 11,
        groom: "Trịnh Văn Bình",
        bride: "Phạm Thị Kim",
        phone: "0988990011",
        date: "2025-08-04",
        shift: "Trưa",
        hall: "Western Elegance D2",
        type: "D",
        deposit: 15500000,
        tables: 42,
        reserveTables: 2,
        status: "Đã thanh toán",
    },
    {
        id: 12,
        groom: "Tống Văn Sơn",
        bride: "Đinh Thị Lệ",
        phone: "0999001122",
        date: "2025-04-09",
        shift: "Tối",
        hall: "Southern Breeze D3",
        type: "D",
        deposit: 19000000,
        tables: 70,
        reserveTables: 5,
        status: "Đã tổ chức",
    },
    {
        id: 13,
        groom: "Nguyễn Văn Minh",
        bride: "Trần Thị Hương",
        phone: "0911223344",
        date: "2025-08-15",
        shift: "Trưa",
        hall: "Sunrise Hall E1",
        type: "E",
        deposit: 16500000,
        tables: 55,
        reserveTables: 3,
        status: "Đã đặt cọc",
    },
    {
        id: 14,
        groom: "Lê Văn Phúc",
        bride: "Phạm Thị Mai",
        phone: "0922334455",
        date: "2025-08-20",
        shift: "Tối",
        hall: "Moonlight Venue E2",
        type: "E",
        deposit: 17500000,
        tables: 60,
        reserveTables: 4,
        status: "Đã đặt cọc",
    },
    {
        id: 15,
        groom: "Trần Văn Thịnh",
        bride: "Lê Thị Hà",
        phone: "0933445566",
        date: "2025-08-25",
        shift: "Trưa",
        hall: "Starlight Room E3",
        type: "E",
        deposit: 14500000,
        tables: 45,
        reserveTables: 2,
        status: "Đã đặt cọc",
    }
];



export default function HallPage() {
    const [selectedHall, setSelectedHall] = useState<string | null>(null);
    const [parties, setParties] = useState(initialData);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [openAddHallDialog, setOpenAddHallDialog] = useState<boolean>(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [hallToDelete, setHallToDelete] = useState<string | null>(null);
    const [openEditHallDialog, setOpenEditHallDialog] = useState<boolean>(false);
    const [hallToEdit, setHallToEdit] = useState<string | null>(null);

    const handleHallClick = (hall: string) => {
        setSelectedHall(hall);
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

    const handleDeleteClick = (hall: string) => {
        setHallToDelete(hall);
        setOpenConfirmDelete(true);
    };

    const handleCloseConfirmDelete = () => {
        setOpenConfirmDelete(false);
        setHallToDelete(null);
    };

    const handleConfirmDelete = () => {
        // TODO: Xử lý xóa sảnh ở đây
        setOpenConfirmDelete(false);
        setHallToDelete(null);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setSelectedType(event.target.value);
    };

    const handleEditClick = (hall: string) => {
        setHallToEdit(hall);
        setOpenEditHallDialog(true);
    };

    const handleCloseEditHallDialog = () => {
        setOpenEditHallDialog(false);
        setHallToEdit(null);
    };

    const filteredParties = initialData.filter(party => {
        const matchesSearch = party.groom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              party.bride.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              party.hall.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'all' || party.type === selectedType;
        return matchesSearch && matchesType;
    });

    useEffect(() => {
        setParties(filteredParties);
    }, [searchQuery, selectedType]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const hallTypes = ["A", "B", "C", "D", "E"];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: "100vh",
            overflow: 'auto',
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '20px',
            boxSizing: 'border-box',
        }}>
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
                <TextField
                    label="Tìm kiếm theo tên sảnh, chú rể, cô dâu"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 1, borderRadius: '50px', '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Tìm kiếm"
                />
                <FormControl sx={{ minWidth: 120, borderRadius: '50px', '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}>
                    <InputLabel id="hall-type-select-label">Loại sảnh</InputLabel>
                    <Select
                        labelId="hall-type-select-label"
                        id="hall-type-select"
                        value={selectedType}
                        label="Loại sảnh"
                        onChange={handleTypeChange}
                    >
                        <MenuItem value="all">Tất cả</MenuItem>
                        {hallTypes.map((type) => (
                            <MenuItem key={type} value={type}>{`Loại ${type}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
                    onClick={handleOpenAddHallDialog}
                >
                    Thêm sảnh
                </Button>
            </Box>

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
                {filteredParties.map((party) => (
                    <Card
                        key={party.hall}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            },
                            position: 'relative',
                        }}
                        onClick={() => handleHallClick(party.hall)}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            gap: 1,
                            zIndex: 2,
                        }} onClick={e => e.stopPropagation()}>
                            <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleEditClick(party.hall)}>
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
                            <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => handleDeleteClick(party.hall)}>
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
                            image={hallInfo[party.hall].image}
                            alt={`Sảnh ${party.hall}`}
                            sx={{
                                width: '100%',
                                objectFit: 'cover',
                                height: 220,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                            }}
                        />
                        <CardContent sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.5rem' }}>
                                    Sảnh {party.hall}
                                </Typography>
                                <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem', lineHeight: 1.5 }}>
                                    {hallInfo[party.hall].description}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <AttachMoneyIcon sx={{ fontSize: '1rem', mr: 0.5, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        Đơn giá bàn tối thiểu: {hallInfo[party.hall].minPrice.toLocaleString('vi-VN')} VNĐ
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TableRestaurantIcon sx={{ fontSize: '1rem', mr: 0.5, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        Tối đa: {hallInfo[party.hall].maxTables} bàn
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
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
                {selectedHall && (() => {
                    const hallDetails = hallInfo[selectedHall];
                    const hallTypeMatch = selectedHall.match(/([A-E])\d/);
                    const hallType = hallTypeMatch ? hallTypeMatch[1] : '';
                    return (
                        <Box>
                            <Box sx={{ width: '100%', height: 240, overflow: 'hidden' }}>
                                <img src={hallDetails.image} alt={selectedHall} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2a3b5d', mb: 1, textAlign: 'center' }}>
                                    Sảnh {selectedHall}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 3, mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TableRestaurantIcon sx={{ color: '#4880FF' }} />
                                        <Typography variant="body1">Loại: <b>{hallType}</b></Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AttachMoneyIcon sx={{ color: '#00b894' }} />
                                        <Typography variant="body1">Giá bàn: <b>{hallDetails.minPrice.toLocaleString('vi-VN')} VNĐ</b></Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TableRestaurantIcon sx={{ color: '#ff9800' }} />
                                        <Typography variant="body1">Tối đa: <b>{hallDetails.maxTables}</b> bàn</Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#555', textAlign: 'center', mb: 2 }}>
                                    {hallDetails.description}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })()}
            </Dialog>

            <AddHallDialog open={openAddHallDialog} onClose={handleCloseAddHallDialog} hallTypes={hallTypes} />
            <EditHallDialog open={openEditHallDialog} onClose={handleCloseEditHallDialog} hall={hallToEdit} hallTypes={hallTypes} />

            <ConfirmDelete open={openConfirmDelete} onClose={handleCloseConfirmDelete} onConfirm={handleConfirmDelete} />
        </Box>
    );
}
