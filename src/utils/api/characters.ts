import { fetcher } from '../fetcher';
import object2Gql from '../object-to-gql';
import { Info, Character, Characters, FilterCharacter, ApiError } from './types';

interface CharactersApiFetcher {
    page?: number;
    filter?: FilterCharacter,
    getOnlyInfo?: boolean
}

interface CharactersApi {
    error: ApiError
    info?: Info,
    results?: [Character]
}

export default async function ({ page = 0, filter = {}, getOnlyInfo = false}: CharactersApiFetcher): Promise<CharactersApi> {
    const query = `
        query ($page: Int!, $getOnlyInfo: Boolean!) {
            characters(page: $page, filter: ${object2Gql(filter)}) {
                info {
                    count
                    pages
                    next @skip(if: $getOnlyInfo)
                    prev @skip(if: $getOnlyInfo)
                }
                results @skip(if: $getOnlyInfo) {
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
                }
            }
        }
    `;

    const { data: { characters }, error } = await fetcher(query, {
        variables: { page, getOnlyInfo }
    });

    return {
        ...(!error && getOnlyInfo && { 
            info: characters.info 
        }),
        ...(!error && !getOnlyInfo && {
            results: characters.results
        }),
        error
    };
}