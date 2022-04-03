import React, { FC } from 'react'
import Box from '@mui/material/Box';
import { Logo } from './Logo';
import { Search } from './Search';
import './Header.scss';

interface Header {
    setSearch?: (searchText: string | undefined) => void;
    showSearch?: boolean;
};

export const Header: FC<Header> = ({
    setSearch,
    showSearch = true
}) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: ['column', 'row'],
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2
            }}>
                <Logo />
                {showSearch && <Search setSearch={setSearch} />}
            </Box>
        </>
    );
}