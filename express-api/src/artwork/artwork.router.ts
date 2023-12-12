import { Router } from 'express';
import { ArtworkController } from './artwork.controller';

export class ArtworkRouter {
    router = Router();

    constructor(private artworkController: ArtworkController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/', (req, res, next) => {
            try {
                const result = this.artworkController.findAll();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.artworkController.findById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add', (req, res, next) => {
            try {
                const result = this.artworkController.create(
                    req.body.name,
                    req.body.description,
                    req.body.price,
                    req.body.image,
                    req.body.artistId,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/:id/edit', (req, res, next) => {
            try {
                const result = this.artworkController.updateById(
                    req.body.id,
                    req.body.name,
                    req.body.description,
                    req.body.price,
                    req.body.image,
                    req.body.artistId,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:id', (req, res, next) => {
            try {
                const result = this.artworkController.deleteById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
