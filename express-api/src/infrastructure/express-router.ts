import { Router } from 'express';
import { ArtworkService } from '../artwork/artwork.service';
import { ArtworkController } from '../artwork/artwork.controller';
import { ArtworkRouter } from '../artwork/artwork.router';
import { ArtistController } from '../artist/artist.controller';
import { ArtistService } from '../artist/artist.service';
import { ArtistRouter } from '../artist/artist.router';

export class ExpressRouter {
    router = Router();

    private artworkController!: ArtworkController;
    private artworkRouter!: ArtworkRouter;

    private artistController!: ArtistController;
    private artistRouter!: ArtistRouter;

    constructor(private artworkService: ArtworkService, private artistService: ArtistService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.artworkController = new ArtworkController(this.artworkService);
        this.artistController = new ArtistController(this.artistService);
    }

    private configureRouters(): void {
        this.artworkRouter = new ArtworkRouter(this.artworkController);
        this.artistRouter = new ArtistRouter(this.artistController);
    }

    private configureRoutes(): void {
        this.router.use('/artworks', this.artworkRouter.router);
        this.router.use('/artists', this.artistRouter.router);
    }
}
