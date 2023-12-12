import { Artwork } from './artwork';
import { ArtworkService } from './artwork.service';

export class ArtworkController {
    constructor(private artworkService: ArtworkService) {}

    /*
        if (username !== username.trim()) throw new Error('Le nom d\'utilisateur ne peut pas être vide')
        if (username.length > 20) throw new Error('Le nom d\'utilisateur ne peut pas dépasser 20 caractères')
        if (username.length < 3) throw new Error('Le nom d\'utilisateur ne peut pas être inférieur à 3 caractères')
        */

    create(
        name: string,
        description: string,
        price: number,
        image: string,
        artistId: number,
    ): Artwork {

        if (name !== name.trim()) throw new Error('Le nom ne peut pas être vide')
        if (name.length > 255) throw new Error('Le nom ne peut pas dépasser 255 caractères')
        if (name.length < 3) throw new Error('Le nom ne peut pas être inférieur à 3 caractères')

        if (description.length > 255) throw new Error('La description ne peut pas dépasser 255 caractères')
        if (description.length < 3) throw new Error('La description ne peut pas être inférieur à 3 caractères')

        if (price < 0) throw new Error('Le prix ne peut pas être inférieur à 0')

        if (image !== image.trim()) throw new Error('L\'image ne peut pas être vide')

        return this.artworkService.create(
            name,
            description,
            price,
            image,
            artistId,
        );
    }

    updateById(
        id: number,
        name: string,
        description: string,
        price: number,
        image: string,
        artistId: number,
    ): Artwork {

        if (name !== name.trim()) throw new Error('Le nom ne peut pas être vide')
        if (name.length > 255) throw new Error('Le nom ne peut pas dépasser 255 caractères')
        if (name.length < 3) throw new Error('Le nom ne peut pas être inférieur à 3 caractères')

        if (description.length > 255) throw new Error('La description ne peut pas dépasser 255 caractères')
        if (description.length < 3) throw new Error('La description ne peut pas être inférieur à 3 caractères')

        if (price < 0) throw new Error('Le prix ne peut pas être inférieur à 0')

        if (image !== image.trim()) throw new Error('L\'image ne peut pas être vide')

        return this.artworkService.updateById(
            id,
            name,
            description,
            price,
            image,
            artistId,
        );
    }

    findById(id: number): Artwork | null {
        if (id < 0) throw new Error('L\'id ne peut pas être inférieur à 0')
        return this.artworkService.findById(id)
    }

    deleteById(id: number): string {
        if (id < 0) throw new Error('L\'id ne peut pas être inférieur à 0')
        return this.artworkService.deleteById(id)
    }

    findAll(): Artwork[] {
        return this.artworkService.findAll();
    }
}
