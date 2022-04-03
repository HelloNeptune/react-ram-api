import React, { FC } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './Header.scss';

interface Search {
    setSearch: (searchText: string | undefined) => void;
};

export const Search: FC<Search> = ({
    setSearch
}) => {
    return (
        <>
            <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for characters"
                    inputProps={{ 'aria-label': 'Search for characters' }}
                    onChange={(event: React.BaseSyntheticEvent) => setSearch(
                        event.target.value
                    )}
                />
                <Divider
                    sx={{ height: 28, m: 0.5 }}
                    orientation="vertical"
                />
                <IconButton
                    type="submit"
                    sx={{ p: '10px' }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </>
    );
}