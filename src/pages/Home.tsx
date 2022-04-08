import React, { FC, useEffect, useState, useRef, useCallback } from 'react'
import Grid from '@mui/material/Grid';
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { Header } from '../components/Header';
import { CharacterCard } from '../components/CharacterCard';
import { Loading } from '../components/Loading';
import { Character, Characters } from '../utils/api/types';
import { api } from '../utils/api';
import './Home.scss';

export const Home: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [characters, setCharacters] = useState<Character[]>([]);
    const [dataInfo, setDataInfo] = useState<any>({});
    const [errorState, setErrorState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [search, setSearch] = useState<string>(
        searchParams.get("q") || ''
    );

    const navigate = useNavigate();
    const page = useRef<number>(1);
    const loadPoint = useRef<number>(0);
    const queryOnload = useRef<boolean>(!!search);
    const defaultFetched = useRef<boolean>(false);


    /**
     * @desc
     */
    const fetchCharactersInfo = async (): Promise<any> => {
        const { info, error } = await api.characters({
            getOnlyInfo: true,
            filter: { name: search }
        });

        queryOnload.current = false;
        if (error) {
            setErrorState(error);
            return;
        }
        defaultFetched.current = true;

        setDataInfo(info);
        setErrorState(null);
    };

    /**
     * @desc
     */
    const fetchCharacters = async (search: string = ''): Promise<Characters | void> => {
        setLoading(true);

        const { results, error } = await api.characters({
            page: page.current,
            filter: { name: search || '' }
        });

        setLoading(false);

        if (error) {
            setErrorState(error);
            return;
        }

        // Append to old data
        setCharacters(characters.concat(results));
        setErrorState(null);
    };

    /**
     * @desc
     */
    const calculateLoadOffset = (): void => {
        const point = document.documentElement.offsetHeight;

        console.log('New fetch point:', point + 'px');
        loadPoint.current = point;
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
            (currentScrollOffset === loadPoint.current) ||
            (loadPoint.current > maxDocumentHeight && currentScrollOffset === maxDocumentHeight)
        ) {
            if (page.current >= dataInfo.pages)
                return;

            page.current = page.current + 1;
            fetchCharacters(search)
        }
    };

    /**
     * @desc
     */
    const searchByTerm = (): void => {
        navigate({
            search: search ? `?${createSearchParams({
                q: search
            })}` : ''
        });

        setCharacters([]);
        fetchCharactersInfo();
    }


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
        if (characters.length && queryOnload.current) {
            queryOnload.current = false;
        }

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

    }, [search]);

    /**
     * @hook
     * @desc search with text
     */
    useEffect(() => {
        // Reset search
        if (!search.length && defaultFetched.current) {
            localStorage.removeItem('search');
            searchByTerm();
            return;
        }

        if (search.length < 3 || queryOnload.current)
            return;

        // Save to localstorage
        localStorage.setItem('search', search);

        searchByTerm();
    }, [search]);

    return (
        <>
            <Container maxWidth="xl">
                {/* Header */}
                <Header setSearch={setSearch} />

                {/* List of characters */}
                {!errorState && (
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
                        </Grid>
                    </div>
                )}

                {/* Header */}
                {errorState && errorState.status === 404 && (
                    <Alert severity="info">No characters found</Alert>
                )}

                {errorState && errorState.status !== 404 && (
                    <Alert severity="error">{errorState.message}</Alert>
                )};

                {/* Loading */}
                {loading && <Loading />}
            </Container>
        </>
    );
}