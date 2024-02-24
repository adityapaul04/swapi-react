import axios from 'axios';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

export const fetchPlanets = async (url = `${SWAPI_BASE_URL}/planets/?format=json`) => {
    try {
        const response = await axios.get(url);
        return {
            planets: response.data.results,
            nextPage: response.data.next,
            prevPage: response.data.previous
        };
    } catch (error) {
        console.error('Error fetching planets:', error);
        return { planets: [], nextPage: null, prevPage: null };
    }
};

export const fetchResidents = async (residentUrls) => {
    try {
        const residentPromises = residentUrls.map(url => axios.get(url));
        const responses = await Promise.all(residentPromises);
        return responses.map(response => response.data);
    } catch (error) {
        console.error('Error fetching residents:', error);
        return [];
    }
};
