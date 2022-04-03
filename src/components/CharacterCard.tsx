import React, { FC } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Character } from '../utils/api/types';
import './CharacterCard.scss';

interface CharacterCard {
    character: Character
}

export const CharacterCard: FC<CharacterCard> = ({
    character
}) => {
    return (
        <>
            <Card
                sx={{ maxWidth: 345 }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={character.image}
                        alt="green iguana"
                    />
                    <CardContent>
                    <Typography variant="subtitle2" component="div">
                        {character.name}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}