import {Artwork} from "./artwork";
export interface ArtworkService {
    add(name: string, description: string, price: number, image: string, artistId: number): Artwork
    getAll(): Artwork[]
    getById(id: number): Artwork | null
    deleteById(id: number): string
}