export interface Album {
  userId: number;
  id: number;
  title: string;
  photos: Photo[];
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
