import { Artist } from './artist';
export interface ArtistService {
    create(
        firstName: string,
        lastName: string,
        description: string,
        image: string,
    ): Artist;
    updateById(
        id: number,
        firstName: string,
        lastName: string,
        description: string,
        image: string,
    ): Artist;
    findAll(): Artist[];
    findById(id: number): Artist | null;
    deleteById(id: number): string;
}
