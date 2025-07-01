import { Button } from '@mui/material';
import { PlusCircle } from 'lucide-react';
import { ButtonProps } from '@mui/material/Button';

interface AddHallButtonProps extends ButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
}

export default function AddHallButton({ onClick, children, ...props }: AddHallButtonProps) {
    return (
        <Button
            variant="contained"
            startIcon={<PlusCircle />}
            onClick={onClick}
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
            {...props}
        >
            {children || 'Thêm sảnh'}
        </Button>
    );
} 