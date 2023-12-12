import { Artwork } from './artwork';
export interface ArtworkService {
    create(
        name: string,
        description: string,
        price: number,
        image: string,
        artistId: number,
    ): Artwork;
    updateById(
        id: number,
        name: string,
        description: string,
        price: number,
        image: string,
        artistId: number,
    ): Artwork;
    findAll(): Artwork[];
    findById(id: number): Artwork | null;
    deleteById(id: number): string;
}
