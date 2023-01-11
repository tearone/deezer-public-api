import fetch from "petitio";
import { DataPage } from "./models/data_page";
import { Album } from "./models/album";
import { Artist } from "./models/artist";
import { ArtistTopTrack } from "./models/track/artist";
import { AlbumTrack } from "./models/track/album";
import { ArtistAlbum } from "./models/artist/album";
import { ArtistRelatedArtist } from "./models/artist/related";
import { ArtistRadioArtist } from "./models/artist/radio";
import { ArtistPlaylist } from "./models/artist/playlist";
import { Genre } from "./models/genre";
import { GenreArtist } from "./models/genre/artist";
import { Track } from "./models/track";

const apiUrl = "https://api.deezer.com/";

interface RequestProps {
  index?: number;
  limit?: number;
  order?: string;
  strict?: boolean;
}

export default class DeezerPublicApi {
  apiUrl: string;

  /*
   *  ALBUM
   */
  album(id: string, limit: number, index: number): Promise<Album> {
    let url = `album/${id}`;
    return this.call(url, { index, limit });
  }

  albumTracks(
    id: string,
    limit: number,
    index: number
  ): Promise<DataPage<AlbumTrack>> {
    let url = `album/${id}/tracks`;
    return this.call(url, { index, limit });
  }

  /*
   *  ARTIST
   */
  artist(id: string, limit: number, index: number): Promise<Artist> {
    let url = `artist/${id}`;
    return this.call(url, { index, limit });
  }

  artistTop(
    id: string,
    limit: number,
    index: number
  ): Promise<DataPage<ArtistTopTrack>> {
    let url = `artist/${id}/top`;
    return this.call(url, { index, limit });
  }

  artistAlbums(
    id: string,
    limit: number,
    index: number
  ): Promise<DataPage<ArtistAlbum>> {
    let url = `artist/${id}/albums`;
    return this.call(url, { index, limit });
  }

  artistRelated(
    id: string,
    limit: number,
    index: number
  ): Promise<DataPage<ArtistRelatedArtist>> {
    let url = `artist/${id}/related`;
    return this.call(url, { index, limit });
  }

  artistRadio(
    id: string,
    limit: number,
    index: number
  ): Promise<ArtistRadioArtist> {
    let url = `artist/${id}/radio`;
    return this.call(url, { index, limit });
  }

  artistPlaylists(
    id: string,
    limit: number,
    index: number
  ): Promise<DataPage<ArtistPlaylist>> {
    let url = `artist/${id}/playlists`;
    return this.call(url, { index, limit });
  }

  /*
   *  GENRE
   */
  genres(): Promise<DataPage<Genre>> {
    let url = "genre/";
    return this.call(url);
  }

  genreArtists(
    id: string,
    limit: number,
    index: number
  ): Promise<DataPage<GenreArtist>> {
    let url = `genre/${id}/artists`;
    return this.call(url, { index, limit });
  }

  /*
   *  PLAYLIST
   */
  // playlist(id, limit, index) {
  //   let url = `playlist/${id}`;
  //   return this.call(url, { index, limit });
  // }

  // playlistTracks(id, limit, index) {
  //   let url = `playlist/${id}/tracks`;
  //   return this.call(url, { index, limit });
  // }

  // playlistRadio(id, limit, index) {
  //   let url = `playlist/${id}/radio`;
  //   return this.call(url, { index, limit });
  // }

  /*
   *  TRACK
   */
  track(id: string): Promise<Track> {
    let url = `track/${id}`;
    return this.call(url, {});
  }

  /*
   *  SEARCH
   */
  search(
    options: { [key: string]: string },
    order: string,
    limit: number,
    index: number
  ) {
    let url = "search?q=";
    let query = "";
    if (typeof options === "object") {
      for (let key in options) {
        query = query + key + ":'" + options[key] + '" ';
      }
    } else {
      query = options;
    }
    url = url + query;

    return this.call(url, { index, limit, order });
  }

  searchArtist(
    query: string,
    order: string,
    limit: number,
    index: number,
    strict: boolean
  ) {
    let url = "search/artist?q=" + query;
    return this.call(url, { index, limit, order, strict });
  }

  searchTrack(
    query: string,
    order: string,
    limit: number,
    index: number,
    strict: boolean
  ) {
    let url = "search/track?q=" + query;
    return this.call(url, { index, limit, order, strict });
  }

  async call<T>(url: string, options?: RequestProps): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!url.includes("?")) url = url + "?";
      if (options?.index && options.index !== 0)
        url = url + "&index=" + options.index;
      if (options?.limit && options.limit !== 0)
        url = url + "&limit=" + options.limit;
      if (options?.order) url = url + "&order=" + options.order;
      if (options?.strict) url = url + "&strict=on";
      if (url.endsWith("?")) url = url.slice(0, -1);
      fetch(apiUrl + url)
        .json()
        .then(resolve)
        .catch(reject);
    });
  }
}
