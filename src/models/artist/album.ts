export interface DzArtistAlbum {
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  genre_id: number;
  fans: number;
  release_date: string;
  record_type: DzArtistAlbumType;
  tracklist: string;
  explicit_lyrics: boolean;
  type: string;
}

export enum DzArtistAlbumType {
  Album = "album",
  Ep = "ep",
  Single = "single",
}
