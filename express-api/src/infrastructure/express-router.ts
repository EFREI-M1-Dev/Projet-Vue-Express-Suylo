import { Router } from 'express';
import { ArtworkService } from "../artwork/artwork.service";
import { ArtworkController } from "../artwork/artwork.controller";
import { ArtworkRouter } from "../artwork/artwork.router";

export class ExpressRouter {
    router = Router();

    private artworkController!: ArtworkController;
    private artworkRouter!: ArtworkRouter;

    constructor(private artworkService: ArtworkService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.artworkController = new ArtworkController(this.artworkService);
    }

    private configureRouters(): void {
        this.artworkRouter = new ArtworkRouter(this.artworkController);
    }

    private configureRoutes(): void {
        this.router.use('/artworks', this.artworkRouter.router);
    }
}