import React, { FC } from 'react'
import Box from '@mui/material/Box';
import { Logo } from './Logo';
import { Search } from './Search';
import './Header.scss';

interface Header {
    setSearch: (searchText: string | undefined) => void;
};

export const Header: FC<Header> = ({
    setSearch
}) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2
            }}>
                <Logo />
                <Search setSearch={setSearch} />
            </Box>
        </>
    );
}