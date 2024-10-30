import { API_BASE_URL, API_KEY } from '../../../constants';

export const request = async (url, options) => {
    const defaultHeaders = {
        'X-Api-Key': API_KEY,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response;
};
