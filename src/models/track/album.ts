export interface AlbumTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  isrc: string;
  link: string;
  duration: number;
  track_position: number;
  disk_number: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: Artist;
  type: string;
}

export interface Artist {
  id: number;
  name: string;
  tracklist: string;
  type: string;
}
