import { fetcher } from '../fetcher';
import object2Gql from '../object-to-gql';
import { Characters, FilterCharacter } from './types';

interface CharactersApi {
    page?: number;
    filter?: FilterCharacter,
    getOnlyInfo?: boolean
}

export default async function ({ page = 0, filter = {}, getOnlyInfo = false}: CharactersApi): Promise<Characters> {
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

    return (await fetcher(query, {
        variables: { page, getOnlyInfo }
    })).characters;
}