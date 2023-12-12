import Axios from './caller.service';

const getArtworks = async () => {
    try {
        const response = await Axios.get('/artworks');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const artworksService = {
    getArtworks
}