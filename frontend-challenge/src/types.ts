export type Surface = "Hard" | "Clay" | "Grass" | "Carpet";

export type Court = {
    id: string;
    name: string;
    city: string;
    state: string;
    surface: Surface;
    courts: number;
    lights: boolean;
    indoor: boolean;
    rating: number;
    ratingCount: number;
    photo: string;
};

export type Review = {
    courtId: string;
    rating: number;
    comment: string;
    createdAt: number;
};