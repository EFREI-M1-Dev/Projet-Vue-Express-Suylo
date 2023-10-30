export class Artwork{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public price: number,
        public image: string,
        public artistId: number
    ) {}
}