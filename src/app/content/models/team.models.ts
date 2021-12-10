import { Country } from ".";

export interface TeamApi {
  response: TeamApiResponse[];
}

export interface TeamApiResponse {
  team: {
    id: number;
    name: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  };
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  };
}

export interface Team {
  id: number;
  name: string;
  countryName: string,
  cityName: string;
  country: Country;
  founded: number;
  logoUrl: string;
  stadium: {
    name: string;
    capacity: number;
    imageUrl: string;
  };
}
