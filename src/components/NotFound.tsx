import React, { FC } from 'react'
import Box from '@mui/material/Box';
import { PickleRick } from '../components/PickleRick';
import './NotFound.scss';

export const NotFound: FC<{ text?: string, size?: 'normal' | 'medium' | 'small' }> = ({
    text = '404',
    size = 'normal' 
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2 className={size}>{text}</h2>
            <PickleRick />
        </Box>
    );
}