import React, { FC, useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { Header } from '../components/Header';
import { CharacterCard } from '../components/CharacterCard';
import { Character, Characters } from '../utils/api/types';
import { api } from '../utils/api';
import './Home.scss';

export const Home: FC = () => {
    const [loadPoint, setLoadPoint] = useState<number>(0);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [dataInfo, setDataInfo] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');

    const page = useRef(1);


    /**
     * @desc
     */
    const fetchCharactersInfo = async (): Promise<any> => {
        const { info } = await api.characters({
            getOnlyInfo: true,
            filter: { name: search }
        });
        setDataInfo(info);
    }

    /**
     * @desc
     */
    const fetchCharacters = async (search: string = ''): Promise<Characters> => {
        setLoading(true);

        const getCharacters = await api.characters({
            page: page.current,
            filter: { name: search || '' }
        });

        // Append to old data
        setCharacters(characters.concat(getCharacters.results));
        setLoading(false);

        return getCharacters;
    };

    /**
     * @esc
     */
    const calculateLoadOffset = (): void => {
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
            (currentScrollOffset === loadPoint) ||
            (loadPoint > maxDocumentHeight && currentScrollOffset === maxDocumentHeight)
        ) {
            if (page.current >= dataInfo.pages)
                return;

            page.current = page.current + 1;
            fetchCharacters(search)
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
        const evts = [
            {
                // listen scrolling to detect when arrived to fetch point
                event: 'scroll',
                listener: detectScrollEdge
            },
            {
                // The fetch point will be change on window resize
                event: 'resize',
                listener: calculateLoadOffset
            }
        ];

        for (const ev of evts) {
            window.addEventListener(ev.event, ev.listener);
        }

        return () => {
            for (const ev of evts) {
                window.removeEventListener(ev.event, ev.listener);
            }

        }
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
     * @desc
     */
    useEffect(() => {
        if (!dataInfo.pages) return;

        page.current = 1;
        fetchCharacters(search);
    }, [dataInfo]);

    /**
     * @hook
     * @desc search with text
     */
    useEffect(() => {
        if (search.length < 3) return;

        setCharacters([]);
        fetchCharactersInfo();
    }, [search]);

    return (
        <>
            <Container maxWidth="xl">
                {/* Header */}
                <Header setSearch={setSearch} />

                {/* List of characters */}
                <div className='characters'>
                    <Grid container spacing={0.5} >
                        {characters && characters.map((character, idx) => (
                            <Grid key={idx} item xs={12} sm={6} md={3} xl={2}>
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
            </Container>
        </>
    );
}