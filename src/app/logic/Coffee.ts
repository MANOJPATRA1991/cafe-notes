import { TasteRating } from './TasteRating';
import { PlaceLocation } from './PlaceLocation';

export class Coffee {
    type: string;
    rating: number;
    notes: string;
    tasteRating: TasteRating;

    constructor(
        public name: string = "",
        public place: string = "",
        public location: PlaceLocation = null
    ) {
        this.location = new PlaceLocation();
        this.tasteRating = new TasteRating();
    }
}