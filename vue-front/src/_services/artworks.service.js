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
        return response.status;
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
        return response.status;
    } catch (error) {
        console.log(error);
    }
}

const updateArtwork = async (id, artwork) => {
    try {
        const response = await Axios.put(`/artworks/${id}/edit`, artwork);
        return response.status;
    } catch (error) {
        console.log(error);
    }
}


export const artworksService = {
    getArtworks,
    newArtwork,
    uploadArtworkImage,
    updateArtwork
}