export interface CountryApi {
  name: {
    common: string;
  };
  flag: string;
  flags: {
    png: string;
  };
  population: number;
}

export interface Country {
  name: string;
  population: number;
  flagUrl: string;
}
