import { apiUrl } from './shared';

interface fetchOptions {
    variables: any
}

/**
 * @desc
 * 
 * @param query 
 * @param options 
 */
export const fetcher = async (query: String, options: fetchOptions = { variables: {}}) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: options.variables
        })
    }
 
    
    // Execute the request
    const response = await fetch(apiUrl, requestOptions);
    
    return (await response.json()).data;
}