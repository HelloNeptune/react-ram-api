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
export const fetcher = async (query: String, options: fetchOptions = { variables: {}}): any => {
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

    // to json
    const { data, errors } = await response.json();
    
    // Make error object
    const { 
        extensions: { 
            response: { 
                body: { error: errorText } = {}, 
                status 
            } = {}
        } = {}
    } = errors ? errors[0] : {};

    return {
        data,
        error: errors ? {
            message: errorText,
            status
        } : null
    };
}