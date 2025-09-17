export type Review = {
    id: string;          
    name?: string;        
    rating: number;
    text?: string;        
  };

export type Location = {
    address: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  
  export type Details = {
    surface: string;
    indoor: boolean;
    lighting: boolean;
  };
  
  export type Availability = {
    status: string;
    booking_required: boolean;
    fee: string;
  };
  
  export type Court = {
    id: string;
    name: string;
    location: Location;
    details: Details;
    availability: Availability;
    last_updated: string;
  };