import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
import { ArtworkJSONService } from '../artwork/artwork.json-service';
import { ArtworkService } from '../artwork/artwork.service';
import * as dotenv from 'dotenv';

export class ExpressApplication {
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private artworkService!: ArtworkService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureServerPort();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private configureServices(): void {
        this.artworkService = new ArtworkJSONService();
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(this.artworkService);
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.expressRouter, this.port);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }
}
