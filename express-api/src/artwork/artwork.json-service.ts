import { Artwork } from './artwork';
import { ArtworkService } from './artwork.service';
import fs from 'fs';
import path from 'path';

export class ArtworkJSONService implements ArtworkService {
    private filePath = path.join(__dirname, '..', '..', 'storage', 'db', 'artworks.json');

    create(
        name: string,
        description: string,
        price: number,
        image: string,
        artistId: number,
    ): Artwork {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '[]');
        }

        let artworksJson = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        let id =
            artworksJson.reduce(
                (maxId: number, art: { id: number }) => Math.max(maxId, art.id),
                0,
            ) + 1;

        const art: Artwork = new Artwork(
            id,
            name,
            description,
            price,
            image,
            artistId,
        );
        artworksJson.push(art);
        fs.writeFileSync(this.filePath, JSON.stringify(artworksJson));
        return art;
    }

    updateById(
        id: number,
        name: string,
        description: string,
        price: number,
        image: string,
        artistId: number,
    ): Artwork {
        const artworks = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        let foundArt: Artwork | null = null;

        artworks.forEach((art: Artwork) => {
            if (art.id === id) {
                foundArt = new Artwork(
                    art.id,
                    name,
                    description,
                    price,
                    image,
                    artistId,
                );
            }
        });

        if (foundArt === null) {
            throw new Error("L'oeuvre n'a pas été trouvée");
        }

        const artsUpdated = artworks.map((art: Artwork) => {
            if (art.id === id) {
                return foundArt;
            }
            return art;
        });

        fs.writeFileSync(this.filePath, JSON.stringify(artsUpdated));

        return foundArt;
    }

    findById(id: number): Artwork | null {
        const artworks = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        let foundArt: Artwork | null = null;

        artworks.forEach((art: Artwork) => {
            if (art.id === id) {
                foundArt = new Artwork(
                    art.id,
                    art.name,
                    art.description,
                    art.price,
                    art.image,
                    art.artistId,
                );
            }
        });
        return foundArt;
    }

    deleteById(id: number): string {
        const artworks = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));

        const artsUpdated = artworks.filter((art: Artwork) => {
            return art.id !== id;
        });

        fs.writeFileSync(this.filePath, JSON.stringify(artsUpdated));

        return "L'oeuvre a bien été supprimée";
    }

    findAll(): Artwork[] {
        const artsJson = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        let artworks: Artwork[] = [];

        artsJson.forEach((art: Artwork) => {
            artworks.push(
                new Artwork(
                    art.id,
                    art.name,
                    art.description,
                    art.price,
                    art.image,
                    art.artistId,
                ),
            );
        });
        return artworks;
    }
}
