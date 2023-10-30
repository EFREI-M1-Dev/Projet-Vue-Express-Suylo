import { Artwork } from './artwork';
import { ArtworkService } from './artwork.service';

export class ArtworkController {
    constructor(private artworkService: ArtworkService) {}

    create(
        name: string,
        description: string,
        price: number,
        image: string,
        artistId: number,
    ): Artwork {
        /*
        if (username !== username.trim()) throw new Error('Le nom d\'utilisateur ne peut pas être vide')
        if (username.length > 20) throw new Error('Le nom d\'utilisateur ne peut pas dépasser 20 caractères')
        if (username.length < 3) throw new Error('Le nom d\'utilisateur ne peut pas être inférieur à 3 caractères')
        */
        return this.artworkService.create(
            name,
            description,
            price,
            image,
            artistId,
        );
    }

    findById(id: number): Artwork | null {
        return this.artworkService.findById(id);
    }

    deleteById(id: number): string {
        return this.artworkService.deleteById(id);
    }

    findAll(): Artwork[] {
        return this.artworkService.findAll();
    }
}
