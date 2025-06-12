import { useState } from "react";
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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    TextField,
    Button,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from '@mui/icons-material/Add';
import { IParty } from "../../interfaces/party.interface";
import { hallInfo, IHallInstance } from "../../constants/hall.constants";

// Mock data - you should replace this with actual data from your backend
const initialData: IParty[] = [
    {
        id: 1,
        groom: "Nguyễn Văn Nam",
        bride: "Trần Thị Lan",
        phone: "0912345678",
        date: "2025-06-15",
        shift: "Trưa",
        hall: "A",
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
        hall: "B",
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
        hall: "C",
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
        hall: "D",
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
        hall: "E",
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
        hall: "A",
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
        hall: "B",
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
        hall: "C",
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
        hall: "D",
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
        hall: "E",
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
        hall: "A",
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
        hall: "B",
        deposit: 19000000,
        tables: 70,
        reserveTables: 5,
        status: "Đã tổ chức",
    },
       // Add more mock data as needed
];

export default function HallPage() {
    const [selectedHall, setSelectedHall] = useState<IHallInstance | null>(null); // Changed back to individual hall instance
    const [parties, setParties] = useState(initialData);
    const [openAddHallForm, setOpenAddHallForm] = useState(false); // New state for add hall form dialog

    // State for new hall form inputs
    const [newHallName, setNewHallName] = useState('');
    const [newHallDescription, setNewHallDescription] = useState('');
    const [newHallMaxCapacity, setNewHallMaxCapacity] = useState<number | ''>('');
    const [newHallMinTablePrice, setNewHallMinTablePrice] = useState<number | ''>('');
    const [newHallAddress, setNewHallAddress] = useState('');

    // Filter states (new for the horizontal bar)
    const [searchTerm, setSearchTerm] = useState('');
    const [hallType, setHallType] = useState(''); // Changed to hallType for consistency with the new filter bar

    // Get unique hall types for display (still useful for the filter dropdown)
    const uniqueHallTypes = Array.from(new Set(hallInfo.map(hall => hall.type)));

    // Hall listing filter (will be based on the new horizontal bar filters)
    const filteredHalls = hallInfo.filter(hall => {
        // Apply search term filter (general keyword search across hall properties)
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const matchName = hall.name.toLowerCase().includes(lowerCaseSearchTerm);
            const matchDescription = hall.description.toLowerCase().includes(lowerCaseSearchTerm);
            const matchAddress = hall.address.toLowerCase().includes(lowerCaseSearchTerm);
            const matchType = hall.type.toLowerCase().includes(lowerCaseSearchTerm); // Search by hall type letter

            if (!(matchName || matchDescription || matchAddress || matchType)) {
                return false;
            }
        }

        // Apply hall type filter (Chọn sảnh)
        if (hallType && hall.type !== hallType) {
            return false;
        }

        return true;
    });

    const handleHallClick = (hall: IHallInstance) => { // Now takes individual hall instance
        setSelectedHall(hall);
    };

    const handleCloseDialog = () => {
        setSelectedHall(null);
        setOpenAddHallForm(false); // Close add form when main dialog closes
    };

    const handleOpenAddHallForm = () => {
        setOpenAddHallForm(true);
    };

    const handleCloseAddHallForm = () => {
        setOpenAddHallForm(false);
        // Reset form fields
        setNewHallName('');
        setNewHallDescription('');
        setNewHallMaxCapacity('');
        setNewHallMinTablePrice('');
        setNewHallAddress('');
    };

    const handleAddHallSubmit = () => {
        // For now, just log the new hall data
        console.log('Adding new hall:', {
            type: selectedHall?.type, // Use selectedHall.type if available
            name: newHallName,
            description: newHallDescription,
            maxCapacity: newHallMaxCapacity,
            minTablePrice: newHallMinTablePrice,
            address: newHallAddress,
        });
        // In a real application, you would send this to your backend
        handleCloseAddHallForm(); // Close the form after submission
    };

    const getPartiesByHall = (hall: string) => {
        return parties.filter(party => party.hall === hall);
    };

    // Helper function for formatting currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: "100vh",
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '20px',
            boxSizing: 'border-box',
        }}>
            {/* New Horizontal Filter Bar */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                {/* Search Input */}
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Tìm kiếm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: '8px' }
                    }}
                    sx={{ width: '200px' }}
                />

                {/* Chọn sảnh (Dropdown - using hall types) */}
                <FormControl size="small" sx={{ width: '120px' }}>
                    <InputLabel>Chọn sảnh</InputLabel>
                    <Select
                        value={hallType}
                        label="Chọn sảnh"
                        onChange={(e) => setHallType(e.target.value as string)}
                    >
                        <MenuItem value="">Tất cả</MenuItem>
                        {uniqueHallTypes.map((type) => (
                            <MenuItem key={type} value={type}>{`Sảnh loại ${type}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Create Button */}
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddHallForm}
                    sx={{ backgroundColor: '#4880FF', '&:hover': { backgroundColor: '#000000' } }}
                >
                    Thêm sảnh
                </Button>
            </Box>

            {/* Hall List Section (Below Top Row) */}
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
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

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 3,
                }}>
                    {filteredHalls.map((hall) => { // Map over filteredHalls to display individual halls

                        return (
                            <Card
                                key={hall.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    },
                                }}
                                onClick={() => handleHallClick(hall)} // Pass the whole hall object
                            >
                                <CardMedia
                                    component="img"
                                    image={hall.image}
                                    alt={`Sảnh ${hall.name}`}
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
                                            {hall.name}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem', lineHeight: 1.5 }}>
                                            {hall.description}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                            <LocationOnIcon sx={{ fontSize: '1rem', mr: 0.5, color: 'text.secondary' }} />
                                            <Typography color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                                                {hall.address}
                                            </Typography>
                                        </Box>
                                        <Typography color="primary" sx={{ fontWeight: 'medium', fontSize: '1rem', mt: 1 }}>
                                            Xem giá
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>

                <Dialog
                    open={selectedHall !== null} // Use selectedHall state
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        Thông tin sảnh - {selectedHall?.name} {/* Display selected hall's name */}
                    </DialogTitle>
                    <DialogContent>
                        {selectedHall && ( // Check if selectedHall is not null
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>STT</TableCell>
                                            <TableCell>Tên Sảnh</TableCell>
                                            <TableCell>Loại Sảnh</TableCell> {/* Changed to Loại Sảnh */}
                                            <TableCell>Số Lượng Bàn Tối Đa</TableCell>
                                            <TableCell>Đơn Giá Bàn Tối Thiểu</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>1</TableCell>
                                            <TableCell>{selectedHall.name}</TableCell> {/* Use selectedHall.name */}
                                            <TableCell>{selectedHall.type}</TableCell> {/* Display selected hall's type */}
                                            <TableCell>{selectedHall.maxCapacity}</TableCell>
                                            <TableCell>{formatCurrency(selectedHall.minTablePrice)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Add New Hall Form Dialog (retained, but not directly accessible from this dialog anymore) */}
                <Dialog
                    open={openAddHallForm}
                    onClose={handleCloseAddHallForm}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>Thêm sảnh mới</DialogTitle> {/* Simplified title as it's now global */}
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                            <TextField
                                label="Tên Sảnh"
                                value={newHallName}
                                onChange={(e) => setNewHallName(e.target.value)}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Mô tả"
                                value={newHallDescription}
                                onChange={(e) => setNewHallDescription(e.target.value)}
                                fullWidth
                                multiline
                                rows={2}
                                size="small"
                            />
                            <TextField
                                label="Sức chứa tối đa"
                                type="number"
                                value={newHallMaxCapacity}
                                onChange={(e) => setNewHallMaxCapacity(Number(e.target.value))}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Đơn giá bàn tối thiểu"
                                type="number"
                                value={newHallMinTablePrice}
                                onChange={(e) => setNewHallMinTablePrice(Number(e.target.value))}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Địa chỉ"
                                value={newHallAddress}
                                onChange={(e) => setNewHallAddress(e.target.value)}
                                fullWidth
                                size="small"
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                                <Button variant="outlined" onClick={handleCloseAddHallForm}>
                                    Hủy
                                </Button>
                                <Button variant="contained" onClick={handleAddHallSubmit} sx={{ backgroundColor: '#4880FF', '&:hover': { backgroundColor: '#000000' } }}>
                                    Thêm sảnh
                                </Button>
                            </Box>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    );
}
