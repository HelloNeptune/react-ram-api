import React, { FC, useMemo } from 'react'
import { useSearchParams } from "react-router-dom";
import debounce from 'lodash.debounce';
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
    const [searchParams] = useSearchParams();

    /**
     * @desc
     * @param event 
     */
    const changeHandler = (event: React.BaseSyntheticEvent) => {
        setSearch(event.target?.value);
    };

    /**
     * @hook memo
     * @desc Execute changeHandler debounced
     */
    const debouncedChangeHandler = useMemo(
        () => debounce(changeHandler, 300), 
        []);

    return (
        <>
            <Paper
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: ['100%', 400],
                    mt: [2, 0]
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for characters"
                    inputProps={{ 'aria-label': 'Search for characters' }}
                    defaultValue={searchParams.get('q')}
                    onChange={debouncedChangeHandler}
                />
                <Divider
                    sx={{ height: 28, m: 0.5 }}
                    orientation="vertical"
                />
                <IconButton
                    type="submit"
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </>
    );
}