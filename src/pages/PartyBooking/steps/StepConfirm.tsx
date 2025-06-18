import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { formatDate } from "../../../utils/formatDate";
import { IFoodBooking } from "../../../interfaces/food.interface";
import { IServiceBooking } from "../../../interfaces/service.interface";

export default function StepConfirm() {
    const {
        watch
    } = useFormContext();

    const selectedFoods: IFoodBooking[] = watch("foods") || []; // Danh sách món đã chọn
    const selectedServices: IServiceBooking[] = watch("services") || []; // Danh sách dịch vụ đã chọn

    const totalTables = (watch("tables") || 0) + (watch("reserveTables") || 0);
    const tablePrice = selectedFoods.reduce((sum, item) => sum + item.price, 0);
    const totalTablesPrice = totalTables * tablePrice;
    const servicesPrice = selectedServices.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalBill = totalTablesPrice + servicesPrice;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                padding: '5px 10px',
                "& fieldset": {
                    borderRadius: "10px",
                },
                "& .MuiInputBase-input": {
                    padding: "15px 10px",
                    fontSize: "16px",
                    "&::placeholder": {
                        color: "#a5bed4",
                        opacity: 1,
                    },
                },
            }}
        >
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: '20px',
            }}>Xác nhận hóa đơn</Typography>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: '75%',
                rowGap: '10px'
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Tên chú rể:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {watch("groom")}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Tên cô dâu:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {watch("bride")}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Số điện thoại:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {watch("phone")}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Sảnh:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {watch("hall").name}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Ngày đãi tiệc:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {formatDate(watch("date"))}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Ca:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {watch("shift")}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Tổng tiền:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {totalBill.toLocaleString('vi-VN')} VND
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Tiền đặt cọc:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {(totalBill * 0.1).toLocaleString('vi-VN')} VND
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Còn lại:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {(totalBill * 0.9).toLocaleString('vi-VN')} VND
                    </Typography>
                </Box>

                <Typography sx={{ fontSize: '16px', fontWeight: 'bold', width: '30%', }}>
                    Đặt bàn:
                </Typography>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Số lượng bàn:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {watch("tables") || 0}
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: '30%',
                }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Số bàn dự trữ:
                    </Typography>
                    <Typography sx={{ fontSize: '16px', }}>
                        {watch("reserveTables") || 0}
                    </Typography>
                </Box>
            </Box>

            <TableContainer component={Paper} sx={{
                width: '80%',
                borderRadius: 3,
                boxShadow: 5,
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Tên món ăn</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Danh mục</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Đơn giá</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Ghi Chú</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedFoods.map((item, index) =>
                            <TableRow key={item.foodId}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="center">{item.category}</TableCell>
                                <TableCell align="center">{item.price.toLocaleString('vi-VN')}</TableCell>
                                <TableCell>{item.note}</TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                Đơn giá bàn: {tablePrice.toLocaleString('vi-VN')}
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                Tổng tiền bàn: {totalTablesPrice.toLocaleString('vi-VN')}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', width: '75%' }}>
                Dịch vụ:
            </Typography>

            <TableContainer component={Paper} sx={{
                width: '80%',
                borderRadius: 3,
                boxShadow: 5,
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Tên dịch vụ</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Số lượng</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Đơn giá</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Thành tiền</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedServices.map((item, index) =>
                            <TableRow key={item.serviceId}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="center">{item.price.toLocaleString('vi-VN')}</TableCell>
                                <TableCell align="center">{(item.quantity * item.price).toLocaleString('vi-VN')}</TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>
                                Tổng tiền dịch vụ: {servicesPrice.toLocaleString('vi-VN')}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
