import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
// Nếu cần dùng IHallInfo hoặc hallInfo thì import từ './hallInfo.mock';

interface AddHallDialogProps {
    open: boolean;
    onClose: () => void;
    hallTypes: string[];
}

const AddHallDialog: React.FC<AddHallDialogProps> = ({ open, onClose, hallTypes }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            BackdropProps={{
                style: { backdropFilter: 'blur(5px)' }
            }}
        >
            <DialogTitle>Thêm sảnh mới</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên Sảnh" variant="outlined" fullWidth />
                <FormControl fullWidth>
                    <InputLabel>Loại Sảnh</InputLabel>
                    <Select label="Loại Sảnh">
                        {hallTypes.map((type) => (
                            <MenuItem key={type} value={type}>{`Loại ${type}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Số Lượng Bàn Tối Đa" variant="outlined" type="number" fullWidth />
                <TextField label="Vị Trí" variant="outlined" fullWidth />
                <TextField label="Ghi Chú" variant="outlined" multiline rows={4} fullWidth />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button onClick={onClose} color="secondary">
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        Lưu
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AddHallDialog; 