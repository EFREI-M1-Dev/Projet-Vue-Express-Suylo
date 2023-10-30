import { Artwork } from './artwork';
import { ArtworkService } from './artwork.service';

export class ArtworkController {
    constructor(private artworkService: ArtworkService) {}

    add(name: string, description: string, price: number, image: string, artistId: number): Artwork {

        /*
        if (username !== username.trim()) throw new Error('Le nom d\'utilisateur ne peut pas être vide')
        if (username.length > 20) throw new Error('Le nom d\'utilisateur ne peut pas dépasser 20 caractères')
        if (username.length < 3) throw new Error('Le nom d\'utilisateur ne peut pas être inférieur à 3 caractères')
        */
        return this.artworkService.add(name, description, price, image, artistId);
    }

    getById(id: number): Artwork | null {
        return this.artworkService.getById(id);
    }

    deleteById(id: number): string {
        return this.artworkService.deleteById(id);
    }

    getAll(): Artwork[] {
        return this.artworkService.getAll();
    }
}