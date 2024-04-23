export type CharacterResponse = {
  info: PaginationInfo;
  results: Character[];
};

export type PaginationInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string; // Update the type based on the actual data you expect
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[]; // An array of episode URLs
  url: string;
  created: string;
};
