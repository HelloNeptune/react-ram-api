import React, { FC } from 'react'
import Box from '@mui/material/Box';
import './Loading.scss';

export const Loading: FC = () => {
    return (
        <Box sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '40px',
            backdropFilter: 'blur(20px)',
            background: 'rgba(10, 25, 41, 0.7)',
            borderTop: '1px solid rgba(194, 224, 255, 0.08)'
        }}>
            <div className="loading-overlay">
                <div className="loading-container">
                    <div className="loading-dot">
                        <img
                            src={require('../public/portal-pixel.png')}
                            className='portal'
                        />
                    </div>
                    <div className="loading-dot">
                        <img
                            src={require('../public/portal-pixel.png')}
                            className='portal'
                        />
                    </div>
                    <div className="loading-dot">
                        <img
                            src={require('../public/portal-pixel.png')}
                            className='portal'
                        />
                    </div>
                </div>
            </div>
        </Box>
    );
}