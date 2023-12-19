import { Router } from 'express';
import { ArtistController } from './artist.controller';

export class ArtistRouter {
    router = Router();

    constructor(private artistController: ArtistController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/', (req, res, next) => {
            try {
                const result = this.artistController.findAll();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.artistController.findById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add', (req, res, next) => {
            try {
                const result = this.artistController.create(
                    req.body.firstName,
                    req.body.lastName,
                    req.body.description,
                    req.body.link,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/:id/edit', (req, res, next) => {
            try {
                const result = this.artistController.updateById(
                    req.body.id,
                    req.body.firstName,
                    req.body.lastName,
                    req.body.description,
                    req.body.link,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:id', (req, res, next) => {
            try {
                const result = this.artistController.deleteById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
