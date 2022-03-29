import { fetcher } from '../fetcher';
import { Character } from './types';

interface CharacterApi {
    id: number
}

export default async function ({ id }: CharacterApi): Promise<Character> {
    const query = `
        query ($id: ID!) {
            character(id: $id) {
                id
                name
                id
                name
                status
                species
                type
                gender
                image
                created
                location {
                    name
                    dimension
                }
                origin {
                    name 
                }
            }
        }
    `;

    return (await fetcher(query, {
        variables: { id }
    })).character;
}