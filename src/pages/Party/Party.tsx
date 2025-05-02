import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import { SearchIcon, PlusCircle, } from "lucide-react";
import PartyTable from "./PartyTable";
import { IParty } from "../../interfaces/party.interface";
import ConfirmDelete from "../../components/Alert/ConfirmDelete/ConfirmDelete";
import PartyForm from "./PartyForm";

type PartyKey = keyof IParty;

const NullParty: IParty = {
    id: 0,
    date: "",
    shift: "",
    hall: "",
    groom: "",
    bride: "",
    phone: "",
    tables: 0,
    reserveTables: 0,
    deposit: 0,
    status: ""
}
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
        status: "Chưa thanh toán",
    },
    {
        id: 2,
        groom: "Lê Minh Quân",
        bride: "Phạm Thị Hạnh",
        phone: "0934567890",
        date: "2025-06-20",
        shift: "Tối",
        hall: "B",
        deposit: 15000000,
        tables: 50,
        reserveTables: 3,
        status: "Chưa thanh toán",
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
        status: "Đã đặt cọc",
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
        status: "Chưa thanh toán",
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
        date: "2025-07-15",
        shift: "Trưa",
        hall: "B",
        deposit: 13000000,
        tables: 45,
        reserveTables: 3,
        status: "Chưa thanh toán",
    },
    {
        id: 8,
        groom: "Vũ Thành Long",
        bride: "Nguyễn Thị Hồng",
        phone: "0955667788",
        date: "2025-07-20",
        shift: "Tối",
        hall: "C",
        deposit: 17000000,
        tables: 60,
        reserveTables: 4,
        status: "Chưa thanh toán",
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
        status: "Chưa thanh toán",
    },
    {
        id: 12,
        groom: "Tống Văn Sơn",
        bride: "Đinh Thị Lệ",
        phone: "0999001122",
        date: "2025-08-09",
        shift: "Tối",
        hall: "B",
        deposit: 19000000,
        tables: 70,
        reserveTables: 5,
        status: "Đã thanh toán",
    },
];


export default function PartyPage() {
    const [parties, setParties] = useState(initialData);
    const [searchKey, setSearchKey] = useState("");
    const [searchBy, setSearchBy] = useState<PartyKey>("groom");
    const [filterShift, setFilterShift] = useState("");
    const [filterHall, setFilterHall] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState<IParty>(NullParty);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const filteredParties = parties.filter((party) => {
        const value = party[searchBy];
        const matchesShift = filterShift ? party.shift === filterShift : true;
        const matchesHall = filterHall ? party.hall === filterHall : true;
        if (typeof value === 'number') {
            // Nếu tìm theo số, so sánh chính xác
            if (searchKey == "") return true;
            return value === Number(searchKey) && matchesShift && matchesHall;
        }
        return value.toLowerCase().includes(searchKey.toLowerCase()) && matchesShift && matchesHall;
    })

    const handleAdd = () => {
        setEditData(NullParty);
        setIsFormOpen(true);
    };

    const handleEdit = (party: IParty) => {
        setEditData(party);
        setIsFormOpen(true);
    };

    const handleDelete = (id: any) => {
        setDeleteId(id);
        setIsDeleteConfirmOpen(true);
    };


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: "100%",
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            <Typography
                sx={{
                    userSelect: "none",
                    color: "var(--text-color)",
                    fontWeight: "bold",
                    fontSize: "28px",
                    marginBottom: "10px",
                    marginX: "10px",
                }}
            >
                Danh sách tiệc cưới
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: "30px",
                    marginX: "10px",
                }}
            >
                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: "80%",
                    alignItems: 'flex-end',
                }}>
                    <TextField
                        id="location-search"
                        type="search"
                        placeholder={"Tìm kiếm"}
                        variant="outlined"
                        required
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        sx={{
                            flex: 2,
                            "& fieldset": {
                                borderRadius: "10px",
                            },
                            "& .MuiInputBase-root": {
                                paddingLeft: "0px",
                                paddingRight: "12px",
                            },
                            "& .MuiInputBase-input": {
                                padding: "10px 0px",
                                fontSize: "16px",
                                "&::placeholder": {
                                    color: "#a5bed4",
                                    opacity: 1,
                                },
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                color: "#a5bed4",
                                                padding: "12px",
                                                zIndex: 100,
                                            }}
                                        >
                                            <SearchIcon />
                                        </Box>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <FormControl
                        sx={{
                            flex: 1,
                            "& fieldset": {
                                borderRadius: "10px",
                            },
                            "& .MuiInputBase-input": {
                                paddingY: "10px",
                                paddingLeft: "14px",
                            },
                        }}
                    >
                        <Select
                            value={searchBy}
                            onChange={(e) => setSearchBy(e.target.value as PartyKey)}

                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        boxSizing: 'border-box',
                                        padding: "0 8px",
                                        border: "1px solid #e4e4e7",
                                        "& .MuiMenuItem-root": {
                                            borderRadius: "6px",
                                            "&:hover": {
                                                backgroundColor: "rgba(117, 126, 136, 0.08)",
                                            },
                                            "&.Mui-selected": {
                                                backgroundColor: "#bcd7ff",
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem value="groom">
                                Tên chú rể
                            </MenuItem>
                            <MenuItem value="bride">
                                Tên cô dâu
                            </MenuItem>
                            <MenuItem value="phone">
                                Số điện thoại
                            </MenuItem>
                            <MenuItem value="deposit">
                                Tiền cọc
                            </MenuItem>
                            <MenuItem value="tables">
                                Số lượng bàn
                            </MenuItem>
                            <MenuItem value="reserveTables">
                                Số bàn dự trữ
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Chọn ca
                        </Typography>
                        <FormControl
                            sx={{
                                "& fieldset": {
                                    borderRadius: "10px",
                                },
                                "& .MuiInputBase-input": {
                                    paddingY: "10px",
                                    paddingLeft: "14px",
                                },
                            }}
                        >
                            <Select
                                value={filterShift}
                                onChange={(e) => setFilterShift(e.target.value)}
                                displayEmpty
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            boxSizing: 'border-box',
                                            padding: "0 8px",
                                            border: "1px solid #e4e4e7",
                                            "& .MuiMenuItem-root": {
                                                borderRadius: "6px",
                                                "&:hover": {
                                                    backgroundColor: "rgba(117, 126, 136, 0.08)",
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: "#bcd7ff",
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    Tất cả
                                </MenuItem>
                                <MenuItem value="Trưa">
                                    Trưa
                                </MenuItem>
                                <MenuItem value="Tối">
                                    Tối
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            Chọn sảnh
                        </Typography>
                        <FormControl
                            sx={{
                                "& fieldset": {
                                    borderRadius: "10px",
                                },
                                "& .MuiInputBase-input": {
                                    paddingY: "10px",
                                    paddingLeft: "14px",
                                },
                            }}
                        >
                            <Select
                                value={filterHall}
                                onChange={(e) => setFilterHall(e.target.value)}
                                displayEmpty
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            boxSizing: 'border-box',
                                            padding: "0 8px",
                                            border: "1px solid #e4e4e7",
                                            "& .MuiMenuItem-root": {
                                                borderRadius: "6px",
                                                "&:hover": {
                                                    backgroundColor: "rgba(117, 126, 136, 0.08)",
                                                },
                                                "&.Mui-selected": {
                                                    backgroundColor: "#bcd7ff",
                                                },
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    Tất cả
                                </MenuItem>
                                <MenuItem value="A">
                                    A
                                </MenuItem>
                                <MenuItem value="B">
                                    B
                                </MenuItem>
                                <MenuItem value="C">
                                    C
                                </MenuItem>
                                <MenuItem value="C">
                                    D
                                </MenuItem>
                                <MenuItem value="E">
                                    E
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<PlusCircle />}
                    onClick={handleAdd}
                    sx={{
                        alignSelf: 'flex-end',
                        padding: '10px 30px',
                        fontSize: "14px",
                        fontWeight: "bold",
                        borderRadius: '8px',
                        backgroundColor: "#4880FF",
                        "&:hover": {
                            backgroundColor: "#5889fd",
                        },
                        textTransform: "none",
                    }}
                >
                    Create
                </Button>
            </Box>

            {/* Table */}
            <PartyTable
                data={filteredParties}
                searchKey={searchKey}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            {/* Form + ConfirmDelete */}
            <PartyForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={(data) => {
                    if (editData) {
                        // update logic
                    } else {
                        // add logic
                    }
                    setIsFormOpen(false);
                }}
                initialData={editData}
            />

            <ConfirmDelete
                open={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={() => {
                    // delete logic using deleteId
                    setIsDeleteConfirmOpen(false);
                }}
            />
        </Box>
    );
}
