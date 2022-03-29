import React, { FC, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { CharacterCard } from '../components/CharacterCard';
import { Character, Characters } from '../utils/api/types';
import { api } from '../utils/api';
import './Home.scss';

export const Home: FC = () => {
    const [page, setPage] = useState<number>(1);
    const [loadPoint, setLoadPoint] = useState<number>(0);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [dataInfo, setDataInfo] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * @desc
     */
    const fetchCharactersInfo = async (): Promise<any> => {
        const { info } = await api.characters({ getOnlyInfo: true });
        setDataInfo(info);
    }

    /**
     * @desc
     * @param page 
     */
    const fetchCharacters = async (page: number = 0): Promise<Characters> => {
        setLoading(true);

        const getCharacters = await api.characters({
            page,
            filter: {} 
        });
        
        // Append to old data
        setCharacters(characters.concat(getCharacters.results));
        setLoading(false);

        return getCharacters;
    };

    /**
     * @esc
     */
    const calculateLoadOffset = ():void => {
        const point = document.documentElement.offsetHeight;

        console.log('New fetch point:', point + 'px');
        setLoadPoint(point);
    };

    /**
     * @desc
     * @param event 
     */
    const detectScrollEdge = (event: Event): void => {
        const maxDocumentHeight = document.documentElement.offsetHeight;
        const currentScrollOffset = window.innerHeight + 
            document.documentElement.scrollTop

        if (
            (currentScrollOffset ===  loadPoint) || 
            (loadPoint > maxDocumentHeight && currentScrollOffset === maxDocumentHeight)
        ) {
            if (page >= dataInfo.pages)
                return;

            setPage(page + 1);
        }
    };
    
    /**
     * @hook
     * @desc initial setup
     */
     useEffect(() => {
        fetchCharactersInfo();
    }, []);

    /**
     * @hook
     * @desc - Register events
     */
     useEffect(() => {
        // listen scrolling to detect when arrived to fetch point
        window.addEventListener('scroll', detectScrollEdge);

        // The fetch point will be change on window resize
        window.addEventListener('resize', calculateLoadOffset);
    }, [detectScrollEdge, calculateLoadOffset]);

    /**
     * @hook
     * @desc 
     */
    useEffect(() => {
        calculateLoadOffset();
    }, [characters]);

    /**
     * @hook
     * @desc fetch new characters when page changed
     */
    useEffect(() => {
        fetchCharacters(page);
    }, [page]);

    return (
        <>
            <div className='characters'>
                <Grid container spacing={0.5} >
                    {characters && characters.map((character, idx) => (
                        <Grid key={idx} item xs={6} md={3} xl={2}>
                            <Link
                                href={"character/" + character.id}
                                underline="none"
                            >
                                <CharacterCard character={character} />
                            </Link>
                        </Grid>
                    ))}
                    {loading && (
                        <Grid item xs={6} md={3} xl={2}>
                            <Box sx={{ 
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <CircularProgress />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </div>
        </>
    );
}