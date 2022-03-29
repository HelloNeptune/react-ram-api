import React, { FC } from 'react'
import Box from '@mui/material/Box';
import './404.scss';

export const _404: FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pickle-rick"></div>
            <h2>404</h2>
        </Box>
    );
}