import React, { FC } from 'react'
import Box from '@mui/material/Box';
import './Logo.scss';

export const Logo: FC = () => {
    return (
        <img
            src={require('../public/logo.png')} 
            className='logo'
        />
    );
}