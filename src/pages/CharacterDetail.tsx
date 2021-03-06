import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import Alert from '@mui/material/Alert';
import { Character, Locations } from '../utils/api/types';
import { api } from '../utils/api';
import { Header } from '../components/Header';

import './CharacterDetail.scss';

/**
 * @desc
 */
const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, 250));

export const CharacterDetail: FC = () => {
    const [character, setCharacter] = useState<Character>(null);
    const [locationsInfo, setLocationsInfo] = useState<any>(null);
    const [lastSeenLocations, setLastSeenLocations] = useState<[] | null>(null);
    const [returnBackQuery, setReturnBackQuery] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const { id } = useParams();

    /**
     * @desc
     * @param page 
     */
     const fetchLocations = async (page: number): Promise<Locations> =>
        await api.locations({ page });

     /**
     * @desc
     * @param page 
     */
      const fetchLocationsInfo = async (page?: number): Promise<Locations> => 
        await api.locations({ getOnlyInfo: true });

    /**
     * @desc
     * @param id 
     */
    const fetchCharacter = async (id: number): Promise<void> => {
        const { character, error } = await api.character({ id });

        if (!character || error) {
            window.location.href = "/404";
        }

        setCharacter(character);
    };

    /**
     * @desc It tries to find last seen locations of 
     * character
     */
    const getLastSeenLocations = async (): Promise<[]> => {
        if (!character) return;
        const foundLocations = [];
        const page = 1;
        const characterId = character.id;

        /**
         * @desc
         * @param page 
         */
        const searchLocations = async (page: number): Promise<any> => {
            const locations = await fetchLocations(page);

            locations.results.forEach(location => {
                location.residents.forEach(resident => {
                    if(characterId === resident.id) {
                        foundLocations.push({
                            name: location.name,
                            dimension: location.dimension
                        })
                    }
                });
            });

            if (
                foundLocations.length !== 5 &&
                page < locationsInfo.pages
            ) {

                // used for exceeding api call limit
                await sleep(250);
                await searchLocations(page + 1);
            }

            return foundLocations;
        }

        setLoading(true);
        const getFoundLocations = await searchLocations(1);

        setLoading(false);
        return getFoundLocations;
    };

    /**
     * @hook
     * @desc initial setup
     */
    useEffect(() => {
        const storedQuery = localStorage.getItem('search');
        
        storedQuery && setReturnBackQuery(storedQuery);
        fetchCharacter(Number(id));
    }, []);

    /**
     * @hook
     * @desc get locations api info when character was loaded
     */
    useEffect(() => {
        if (!character) return;

        (async () => {
            setLocationsInfo(
                (await fetchLocationsInfo()).info
            );
        })();
    }, [character]);

    /**
     * @hook
     * @desc
     */
    useEffect(() => {
        if (!locationsInfo) return;

        
        (async () => {
            setLastSeenLocations(
                await getLastSeenLocations()
            );
        })();
    }, [locationsInfo]);

    return (
        <>
            {character && (
                <Box sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' 
                }}>
                    <Header showSearch={false} />

                    <Card sx={{
                        display: 'flex',
                        flexDirection: ['column', 'row'],
                        maxWidth: 800,
                        width: '100%'
                    }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: ['100%', 400],
                                height: [300, 'auto']
                            }}
                            image={character.image}
                        />
                        <Box sx={{
                            display:'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                            <CardContent sx={{ width: '100%' }}>
                                <Typography
                                    component="div"
                                    variant="h5"
                                >
                                    {character.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    component="div"
                                >
                                    {character.origin.name}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    component="div"
                                >
                                    {character.location.dimension}
                                </Typography>
                            </CardContent>
                            <Divider light />
                            <Typography
                                color="text.secondary"
                                component="div"
                                sx={{
                                    p: 2,
                                    display:'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <TrackChangesOutlinedIcon sx={{ mr: 1 }} /> Last Seen Locations
                            </Typography>
                            <Divider light />
                            {lastSeenLocations && lastSeenLocations.length && (
                                lastSeenLocations.map((location: any, idx) => (
                                    <Box key={idx}>
                                        <Box sx={{
                                            p: 2,
                                            display:'flex',
                                            alignItems: 'center'
                                        }}>
                                            ?? {location.name}
                                        </Box>
                                        
                                        {idx !== lastSeenLocations.length - 1 && (
                                            <Divider light />
                                        )}
                                    </Box>
                                ))
                            )}
                            {loading && (
                                <Box
                                    sx={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2
                                    }}
                                >
                                    <Alert icon={false} severity="info">
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <CircularProgress
                                                size="20px" 
                                                sx={{ marginRight: 2 }}
                                            />
                                            Searching for last seen locations
                                        </Box>
                                    </Alert>
                                </Box>
                            )}
                            {lastSeenLocations && !lastSeenLocations.length && (
                                <Box>
                                     <Box
                                        sx={{ 
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <Typography
                                            color="text.secondary"
                                            component="div"
                                            sx={{ p: 2 }}
                                        >
                                            <Alert severity="warning">
                                                {character.name} not seen anywhere
                                            </Alert>
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Card>
                    <Link
                        href={`/${returnBackQuery ? '?q=' + returnBackQuery : ''}`}
                        underline="none"
                    >
                        <Button sx={{ margin: '10px 0' }}>
                            <ArrowBackIosNewOutlinedIcon />
                            Back to Home
                        </Button>
                    </Link>
                </Box>
            )}
        </>
    );
}