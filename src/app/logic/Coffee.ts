import { TasteRating } from './TasteRating';
import { PlaceLocation } from './PlaceLocation';

export class Coffee {
    type: string;
    rating: number;
    notes: string;
    tastingRating: TasteRating;

    constructor(
        public name: string,
        public place: string,
        public location: PlaceLocation
    ) {
        
    }
}