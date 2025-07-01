import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface InfoCardProps {
    title: string;
    image: string;
    description: string;
    price?: string;
    onCardClick: () => void;
    onEditClick: () => void;
    onDeleteClick: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, image, description, price, onCardClick, onEditClick, onDeleteClick }) => {
    return (
        <Card
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.3s',
                borderRadius: '12px',
                backgroundColor: '#fff',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                position: 'relative',
            }}
            onClick={onCardClick}
        >
            <Box sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 1,
                zIndex: 2,
            }} onClick={e => e.stopPropagation()}>
                <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={onEditClick}>
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
                            '&:hover': {
                                bgcolor: '#f0f0f0',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                            }
                        }}
                    >
                        <EditIcon fontSize="small" sx={{ color: '#00e1ff', opacity: 0.85 }} />
                    </Box>
                </Button>
                <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={onDeleteClick}>
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
                            '&:hover': {
                                bgcolor: '#f0f0f0',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                            }
                        }}
                    >
                        <DeleteIcon fontSize="small" sx={{ color: '#ff0000', opacity: 0.85 }} />
                    </Box>
                </Button>
            </Box>
            <CardMedia
                component="img"
                image={image}
                alt={title}
                sx={{
                    width: '100%',
                    objectFit: 'cover',
                    height: 220,
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                }}
            />
            <CardContent sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.5rem' }}>
                    {title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem', lineHeight: 1.5, height: '80px', overflow: 'hidden' }}>
                    {description}
                </Typography>
                {price && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                        {price}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default InfoCard; 