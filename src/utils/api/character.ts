import { fetcher } from '../fetcher';
import { Character, ApiError } from './types';

interface CharacterApiFetcher {
    id: number
}

interface CharactersApi {
    error: ApiError
    character?: Character
}

export default async function ({ id }: CharacterApiFetcher): Promise<CharactersApi> {
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
    const { data: { character }, error } = await fetcher(query, {
        variables: { id }
    });

    return { character, error };
}