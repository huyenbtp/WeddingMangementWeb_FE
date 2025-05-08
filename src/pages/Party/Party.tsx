import { useState } from "react";
import {
    Box,
    Button,
    Typography,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import { PlusCircle, } from "lucide-react";
import PartyTable from "./PartyTable";
import { IParty } from "../../interfaces/party.interface";
import ConfirmDelete from "../../components/Alert/ConfirmDelete/ConfirmDelete";
import PartyForm from "./PartyForm";
import PartyFilter from "../../components/Filter/PartyFilter";
import SearchBar from "../../components/SearchBar"
import { DatePicker, } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type PartyKey = keyof IParty;

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
];


export default function PartyPage() {
    const [parties, setParties] = useState(initialData);
    const [searchKey, setSearchKey] = useState("");
    const [searchBy, setSearchBy] = useState<PartyKey>("groom");
    const [filterShift, setFilterShift] = useState("");
    const [filterHall, setFilterHall] = useState("");
    const [fromDate, setFromDate] = useState((dayjs().startOf("year")).toString());
    const [toDate, setToDate] = useState((dayjs().endOf("year")).toString());
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState<IParty | null>(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const filteredParties = parties.filter((party) => {
        if (searchBy == 'date') return true;

        const partyDate = new Date(party.date);

        const matchesDate = (new Date(fromDate) <= partyDate && partyDate <= new Date(toDate));
        const matchesShift = filterShift ? party.shift === filterShift : true;
        const matchesHall = filterHall ? party.hall === filterHall : true;

        if (searchKey == "") return matchesDate && matchesShift && matchesHall;

        const value = party[searchBy];
        if (typeof value === 'number') {
            // Nếu tìm theo số, so sánh chính xác
            return value === Number(searchKey) && matchesDate && matchesShift && matchesHall;
        }
        return value.toLowerCase().includes(searchKey.toLowerCase()) && matchesDate && matchesShift && matchesHall;
    })

    const handleAdd = () => {
        setEditData(null);
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
            backgroundColor: '#fff',
            borderRadius: '15px',
            paddingTop: '15px',
        }}>
            <Typography
                sx={{
                    userSelect: "none",
                    color: "var(--text-color)",
                    fontWeight: "bold",
                    fontSize: "32px",
                    marginX: "20px",
                }}
            >
                Danh sách tiệc cưới
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: "20px",
                    marginX: "20px",
                }}
            >
                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: "80%",
                    alignItems: 'flex-end',
                }}>
                    <SearchBar
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
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
                                backgroundColor: '#fff',
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

                    <PartyFilter
                        label="Chọn ca"
                        value={filterShift}
                        onChange={(e) => setFilterShift(e.target.value)}
                        children={["Trưa", "Tối"]}
                    />

                    <PartyFilter
                        label="Chọn sảnh"
                        value={filterHall}
                        onChange={(e) => setFilterHall(e.target.value)}
                        children={["A", "B", "C", "D", "E"]}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Từ ngày
                            </Typography>
                            <DatePicker
                                value={dayjs(fromDate)}
                                format="DD/MM/YYYY"
                                onChange={(value) => setFromDate((
                                    value?.toDate() || new Date()).toString()
                                )}
                                sx={{
                                    "& .MuiPickersInputBase-root": {
                                        backgroundColor: '#fff',
                                        borderRadius: "10px",
                                        gap: '5px',
                                    },
                                    "& .MuiPickersSectionList-root": {
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '43px',
                                        width: 'fit-content',
                                        paddingY: '0px',
                                    },
                                }}
                                slotProps={{
                                    popper: {
                                        sx: {
                                            '& .MuiPaper-root': {
                                                borderRadius: '20px',
                                            },
                                            '& .MuiDateCalendar-root': {
                                                padding: '18px 20px',
                                                gap: '10px',
                                                maxHeight: '360px',
                                                height: 'auto',
                                                width: '310px'
                                            },
                                            '& .MuiPickersCalendarHeader-root': {
                                                padding: '0 8px',
                                                margin: 0,
                                                justifyContent: 'space-between',
                                            },
                                            '& .MuiPickersCalendarHeader-labelContainer': {
                                                color: '#202224',
                                                fontWeight: 600,
                                                fontSize: '15px',
                                                margin: 0,
                                            },
                                            '& .MuiPickersArrowSwitcher-root': {
                                                gap: '5px'
                                            },
                                            '& .MuiPickersArrowSwitcher-button': {
                                                padding: 0,
                                                backgroundColor: '#e7e9ee',
                                                borderRadius: '5px'
                                            },
                                            '& .MuiTypography-root': {
                                                color: '#454545',
                                            },
                                            '& .MuiDayCalendar-slideTransition': {
                                                minHeight: 0,
                                                marginBottom: '4px'
                                            },
                                        },
                                    },
                                    day: {
                                        sx: {
                                            color: "#8f9091",
                                            borderRadius: '10px',
                                            '&:hover': {
                                                backgroundColor: '#e3f2fd',
                                            },
                                            '&.MuiPickersDay-root.Mui-selected': {
                                                backgroundColor: '#4880FF',
                                                color: '#fff',
                                                '&:hover': {
                                                    backgroundColor: '#4880FF'
                                                }
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Đến ngày
                            </Typography>
                            <DatePicker
                                value={dayjs(toDate)}
                                format="DD/MM/YYYY"
                                onChange={(value) => setToDate((
                                    value?.toDate() || new Date()).toString()
                                )}
                                sx={{
                                    "& .MuiPickersInputBase-root": {
                                        backgroundColor: '#fff',
                                        borderRadius: "10px",
                                        gap: '5px'
                                    },
                                    "& .MuiPickersSectionList-root": {
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '43px',
                                        width: 'fit-content',
                                        paddingY: '0px',
                                    },
                                }}
                                slotProps={{
                                    popper: {
                                        sx: {
                                            '& .MuiPaper-root': {
                                                borderRadius: '20px',
                                            },
                                            '& .MuiDateCalendar-root': {
                                                padding: '18px 20px',
                                                gap: '10px',
                                                maxHeight: '360px',
                                                height: 'auto',
                                                width: '310px'
                                            },
                                            '& .MuiPickersCalendarHeader-root': {
                                                padding: '0 8px',
                                                margin: 0,
                                                justifyContent: 'space-between',
                                            },
                                            '& .MuiPickersCalendarHeader-labelContainer': {
                                                color: '#202224',
                                                fontWeight: 600,
                                                fontSize: '15px',
                                                margin: 0,
                                            },
                                            '& .MuiPickersArrowSwitcher-root': {
                                                gap: '5px'
                                            },
                                            '& .MuiPickersArrowSwitcher-button': {
                                                padding: 0,
                                                backgroundColor: '#e7e9ee',
                                                borderRadius: '5px'
                                            },
                                            '& .MuiTypography-root': {
                                                color: '#454545',
                                            },
                                            '& .MuiDayCalendar-slideTransition': {
                                                minHeight: 0,
                                                marginBottom: '4px'
                                            },
                                        },
                                    },
                                    day: {
                                        sx: {
                                            color: "#8f9091",
                                            borderRadius: '10px',
                                            '&:hover': {
                                                backgroundColor: '#e3f2fd',
                                            },
                                            '&.MuiPickersDay-root.Mui-selected': {
                                                backgroundColor: '#4880FF',
                                                color: '#fff',
                                                '&:hover': {
                                                    backgroundColor: '#4880FF'
                                                }
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </LocalizationProvider>
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
                            backgroundColor: "#3578f0",
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
                onSubmit={(_data) => {
                    if (editData) {
                        // update logic
                    } else {
                        // add logic
                    }
                    setIsFormOpen(false);
                }}
                initialData={editData}
                readOnly={false}
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
