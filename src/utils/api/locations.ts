import { fetcher } from '../fetcher';
import { Locations } from './types';

interface LocationsApi {
    page?: number,
    getOnlyInfo?: boolean
}

export default async function ({ page = 1, getOnlyInfo = false }: LocationsApi): Promise<Locations> {
    const query = `
        query ($page: Int!, $getOnlyInfo: Boolean!) {
            locations(page: $page) {
                info {
                    pages
                    next
                }
                results @skip(if: $getOnlyInfo) {
                    name
                    dimension
                    residents {
                        id
                        name
                    }
                }
            }
        }
    `;

    return (await fetcher(query, {
        variables: { page, getOnlyInfo }
    })).locations;
}