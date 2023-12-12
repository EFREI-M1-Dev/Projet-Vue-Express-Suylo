import Axios from './caller.service';


const getArtists = async () => {
    try {
        const response = await Axios.get('/artists');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getArtistById = async (id) => {
    try {
        const response = await Axios.get(`/artists/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const artistsService = {
    getArtists,
    getArtistById
}