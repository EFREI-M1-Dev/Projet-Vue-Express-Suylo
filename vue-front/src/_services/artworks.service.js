import Axios from './caller.service';

const getArtworks = async () => {
    try {
        const response = await Axios.get('/artworks');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const newArtwork = async (artwork) => {
    try {
        const response = await Axios.post('/artworks/add', artwork);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const uploadArtworkImage = async (artwork, artworkName) => {
    try {
        const response = await Axios.post(`/artworks/upload`, {
            image: artwork,
            imageName: artworkName
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const artworksService = {
    getArtworks,
    newArtwork,
    uploadArtworkImage
}