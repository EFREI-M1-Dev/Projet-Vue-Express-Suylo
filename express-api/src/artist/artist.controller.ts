import { Artist } from './artist';
import { ArtistService } from './artist.service';

export class ArtistController {
    constructor(private artistService: ArtistService) {}

    create(
        firstName: string,
        lastName: string,
        description: string,
        image: string,
    ): Artist {
        return this.artistService.create(
            firstName,
            lastName,
            description,
            image,
        );
    }

    updateById(
        id: number,
        firstName: string,
        lastName: string,
        description: string,
        image: string,
    ): Artist {
        return this.artistService.updateById(
            id,
            firstName,
            lastName,
            description,
            image,
        );
    }

    findById(id: number): Artist | null {
        if (id < 0) throw new Error("L'id ne peut pas être inférieur à 0");
        return this.artistService.findById(id);
    }

    deleteById(id: number): string {
        if (id < 0) throw new Error("L'id ne peut pas être inférieur à 0");
        return this.artistService.deleteById(id);
    }

    findAll(): Artist[] {
        return this.artistService.findAll();
    }
}
