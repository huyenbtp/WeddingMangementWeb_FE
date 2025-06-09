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
} from "@mui/material";
import { IParty } from "../../interfaces/party.interface";
import { hallInfo } from "../../constants/hall.constants";

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

const halls = ["A", "B", "C", "D", "E"];

export default function HallPage() {
    const [selectedHall, setSelectedHall] = useState<string | null>(null);
    const [parties, setParties] = useState(initialData);

    const handleHallClick = (hall: string) => {
        setSelectedHall(hall);
    };

    const handleCloseDialog = () => {
        setSelectedHall(null);
    };

    const getPartiesByHall = (hall: string) => {
        return parties.filter(party => party.hall === hall);
    };

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

            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3,
                '& > *': {
                    flex: '1 1 calc(33.333% - 16px)',
                    minWidth: '300px'
                }
            }}>
                {halls.map((hall) => (
                    <Card
                        key={hall}
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
                        }}
                        onClick={() => handleHallClick(hall)}
                    >
                        <CardMedia
                            component="img"
                            image={hallInfo[hall].image}
                            alt={`Sảnh ${hall}`}
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
                                    Sảnh {hall}
                                </Typography>
                                <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem', lineHeight: 1.5 }}>
                                    {hallInfo[hall].description}
                                </Typography>
                            </Box>
                            <Typography color="primary" sx={{ fontWeight: 'medium', fontSize: '1rem' }}>
                                Số tiệc đã đặt: {getPartiesByHall(hall).length}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Dialog
                open={selectedHall !== null}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    Thông tin tiệc cưới - Sảnh {selectedHall}
                </DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Chú rể</TableCell>
                                    <TableCell>Cô dâu</TableCell>
                                    <TableCell>Ngày</TableCell>
                                    <TableCell>Ca</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedHall && getPartiesByHall(selectedHall).map((party) => (
                                    <TableRow key={party.id}>
                                        <TableCell>{party.groom}</TableCell>
                                        <TableCell>{party.bride}</TableCell>
                                        <TableCell>{party.date}</TableCell>
                                        <TableCell>{party.shift}</TableCell>
                                        <TableCell>{party.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
