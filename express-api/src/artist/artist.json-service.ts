import { Artist } from './artist';
import { ArtistService } from './artist.service';
import fs from 'fs';
import path from 'path';

export class ArtistJSONService implements ArtistService {
    private filePath = path.join(__dirname, '..', '..', 'storage', 'db', 'artists.json');

    create(
        firstName: string,
        lastName: string,
        description: string,
        image: string,
    ): Artist {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '[]');
        }

        let artistsJson = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        let id =
            artistsJson.reduce(
                (maxId: number, art: { id: number }) => Math.max(maxId, art.id),
                0,
            ) + 1;

        const art: Artist = new Artist(
            id,
            firstName,
            lastName,
            description,
            image,
        );
        artistsJson.push(art);
        fs.writeFileSync(this.filePath, JSON.stringify(artistsJson));
        return art;
    }

    updateById(
        id: number,
        firstName: string,
        lastName: string,
        description: string,
        image: string,
    ): Artist {
        const artists = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        let foundArtist: Artist | null = null;

        artists.forEach((art: Artist) => {
            if (art.id === id) {
                foundArtist = new Artist(
                    art.id,
                    firstName,
                    lastName,
                    description,
                    image,
                );
            }
        });

        if (foundArtist === null) {
            throw new Error("L'artiste n'a pas été trouvée");
        }

        const artistUpdated = artists.map((art: Artist) => {
            if (art.id === id) {
                return foundArtist;
            }
            return art;
        });

        fs.writeFileSync(this.filePath, JSON.stringify(artistUpdated));

        return foundArtist;
    }

    findById(id: number): Artist | null {
        const artists = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        let foundArtist: Artist | null = null;

        artists.forEach((artist: Artist) => {
            if (artist.id === id) {
                foundArtist = new Artist(
                    artist.id,
                    artist.firstName,
                    artist.lastName,
                    artist.description,
                    artist.image,
                );
            }
        });
        return foundArtist;
    }

    deleteById(id: number): string {
        const artists = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));

        const artistsUpdated = artists.filter((art: Artist) => {
            return art.id !== id;
        });

        fs.writeFileSync(this.filePath, JSON.stringify(artistsUpdated));

        return "L'artiste a bien été supprimée";
    }

    findAll(): Artist[] {
        const artistsJson = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
        let artists: Artist[] = [];

        artistsJson.forEach((artist: Artist) => {
            artists.push(
                new Artist(
                    artist.id,
                    artist.firstName,
                    artist.lastName,
                    artist.description,
                    artist.image,
                ),
            );
        });
        return artists;
    }
}
