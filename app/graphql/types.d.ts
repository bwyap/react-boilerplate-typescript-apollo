export interface Artist {
  id: string;
  name: string;
  image: string;
  albums: Array<{
    id: string;
    name: string;
  }>;
}
