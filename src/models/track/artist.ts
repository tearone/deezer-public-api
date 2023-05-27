export interface DzArtistTopTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  contributors: DzArtistTopTrackContributor[];
  md5_image: string;
  artist: DzArtistTopTrackArtist;
  album: DzArtistTopTrackAlbum;
  type: string;
}

export interface DzArtistTopTrackAlbum {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
}

export interface DzArtistTopTrackArtist {
  id: number;
  name: string;
  tracklist: string;
  type: string;
}

export interface DzArtistTopTrackContributor {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  radio: boolean;
  tracklist: string;
  type: string;
  role: string;
}
