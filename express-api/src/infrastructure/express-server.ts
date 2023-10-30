import express from 'express';
import cors from 'cors';
import { ExpressRouter } from './express-router';
import bodyParser from 'body-parser';

export class ExpressServer {
    private express = express();
    private cors = cors();
    private allowedOrigins = ['http://localhost:3000'];

    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureCors();
        this.configureBodyParser();
        this.configureRoutes();
    }

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }

    private configureCors(): void {
        this.express.use(cors());
    }

    private configureBodyParser(): void {
        this.express.use(bodyParser.json());
    }

    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
    }
}
