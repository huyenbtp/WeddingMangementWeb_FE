import {
    Box,
    TextField,
    InputAdornment,
} from "@mui/material";
import { SearchIcon } from "lucide-react";
import { SxProps } from '@mui/material';

export default function SearchBar({
    value,
    onChange,
    sx
}: {
    value: string,
    onChange: (e: any) => void,
    sx?: SxProps,
}) {
    return (
        <TextField
            id="location-search"
            type="search"
            placeholder={"Tìm kiếm"}
            variant="outlined"
            required
            value={value}
            onChange={onChange}
            fullWidth
            sx={sx}
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
                                    zIndex: 1,
                                }}
                            >
                                <SearchIcon />
                            </Box>
                        </InputAdornment>
                    ),
                },
            }}
        />
    )
}