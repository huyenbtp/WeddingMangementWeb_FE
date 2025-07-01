import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { IHall } from '../../interfaces/hall.interface';

interface EditHallDialogProps {
    open: boolean;
    onClose: () => void;
    hall: IHall | null;
    hallTypes: string[];
}

const EditHallDialog: React.FC<EditHallDialogProps> = ({ open, onClose, hall, hallTypes }) => {
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
            <DialogTitle>Sửa thông tin sảnh</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Tên Sảnh" variant="outlined" fullWidth defaultValue={hall?.name || ''} />
                <FormControl fullWidth>
                    <InputLabel>Loại Sảnh</InputLabel>
                    <Select label="Loại Sảnh" defaultValue={hall?.type || ''}>
                        {hallTypes.map((type) => (
                            <MenuItem key={type} value={type}>{`Loại ${type}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Số Lượng Bàn Tối Đa" variant="outlined" type="number" fullWidth defaultValue={hall?.maxTables || ''} />
                <TextField label="Đơn Giá Bàn Tối Thiểu" variant="outlined" type="number" fullWidth defaultValue={hall?.minPrice || ''} />
                <TextField label="Vị Trí" variant="outlined" fullWidth defaultValue={hall?.location || ''} />
                <TextField label="Ghi Chú" variant="outlined" multiline rows={4} fullWidth defaultValue={hall?.description || ''} />
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

export default EditHallDialog; 