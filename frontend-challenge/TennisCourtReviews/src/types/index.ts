export interface TennisCourt {
  id: string;
  name: string;
  location: string;
  address: string;
  surface: 'Hard' | 'Clay' | 'Grass' | 'Indoor Hard' | 'Artificial Grass';
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  amenities: string[];
  images: string[];
  description: string;
  latitude: number;
  longitude: number;
  phoneNumber?: string;
  website?: string;
  openingHours: {
    [key: string]: string;
  };
}

export interface Review {
  id: string;
  courtId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface CourtListScreenProps {
  navigation: any;
}

export interface CourtDetailScreenProps {
  navigation: any;
  route: {
    params: {
      courtId: string;
    };
  };
}

export type RootStackParamList = {
  CourtList: undefined;
  CourtDetail: { courtId: string };
};
