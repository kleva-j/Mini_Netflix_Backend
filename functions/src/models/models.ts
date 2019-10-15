export interface IsampleDataItems {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  ratings: Array<ratings>
  metascore: string,
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  type: string;
  DVD?: string;
  BoxOffice?: string;
  production?: string;
  website?: string;
  totalSeasons?: string;
  response: string
}

export interface IsampleDataStore {
  [name: string]: IsampleDataItems
}

interface ratings {
  source: string;
  value: string;
}