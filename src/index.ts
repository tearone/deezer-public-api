import fetch from "node-fetch";
import { DzDataPage } from "./models/data_page";
import { DzAlbum } from "./models/album";
import { DzArtist } from "./models/artist";
import { DzArtistTopTrack } from "./models/track/artist";
import { DzAlbumTrack } from "./models/track/album";
import { DzArtistAlbum } from "./models/artist/album";
import { DzArtistRelatedArtist } from "./models/artist/related";
import { DzArtistRadioArtist } from "./models/artist/radio";
import { DzArtistPlaylist } from "./models/artist/playlist";
import { DzGenre } from "./models/genre";
import { DzGenreArtist } from "./models/genre/artist";
import { DzTrack } from "./models/track";

export type { DzTrack, DzArtist, DzAlbum, DzDataPage };

const apiUrl = "https://api.deezer.com/";

interface RequestProps {
  index?: number;
  limit?: number;
  order?: string;
  strict?: boolean;
}

export default class DeezerPublicApi {
  /*
   *  ALBUM
   */
  album(id: string, limit: number, index: number): Promise<DzAlbum> {
    let url = `album/${id}`;
    return this.call(url, { index, limit });
  }

  albumTracks(
    id: string,
    limit: number,
    index: number
  ): Promise<DzDataPage<DzAlbumTrack>> {
    let url = `album/${id}/tracks`;
    return this.call(url, { index, limit });
  }

  /*
   *  ARTIST
   */
  artist(id: string, limit: number, index: number): Promise<DzArtist> {
    let url = `artist/${id}`;
    return this.call(url, { index, limit });
  }

  artistTop(
    id: string,
    limit: number,
    index: number
  ): Promise<DzDataPage<DzArtistTopTrack>> {
    let url = `artist/${id}/top`;
    return this.call(url, { index, limit });
  }

  artistAlbums(
    id: string,
    limit: number,
    index: number
  ): Promise<DzDataPage<DzArtistAlbum>> {
    let url = `artist/${id}/albums`;
    return this.call(url, { index, limit });
  }

  artistRelated(
    id: string,
    limit: number,
    index: number
  ): Promise<DzDataPage<DzArtistRelatedArtist>> {
    let url = `artist/${id}/related`;
    return this.call(url, { index, limit });
  }

  artistRadio(
    id: string,
    limit: number,
    index: number
  ): Promise<DzArtistRadioArtist> {
    let url = `artist/${id}/radio`;
    return this.call(url, { index, limit });
  }

  artistPlaylists(
    id: string,
    limit: number,
    index: number
  ): Promise<DzDataPage<DzArtistPlaylist>> {
    let url = `artist/${id}/playlists`;
    return this.call(url, { index, limit });
  }

  /*
   *  GENRE
   */
  genres(): Promise<DzDataPage<DzGenre>> {
    let url = "genre/";
    return this.call(url);
  }

  genreArtists(
    id: string,
    limit: number,
    index: number
  ): Promise<DzDataPage<DzGenreArtist>> {
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
  track(id: string): Promise<DzTrack> {
    let url = `track/${id}`;
    return this.call(url, {});
  }

  /*
   *  SEARCH
   */
  search(
    options: { [key: string]: string } | string,
    order: string,
    limit: number,
    index: number
  ): Promise<DzDataPage<DzTrack>> {
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
  ): Promise<DzDataPage<DzArtist>> {
    let url = "search/artist?q=" + query;
    return this.call(url, { index, limit, order, strict });
  }

  searchTrack(
    query: string,
    order: string,
    limit: number,
    index: number,
    strict: boolean
  ): Promise<DzDataPage<DzTrack>> {
    let url = "search/track?q=" + query;
    return this.call(url, { index, limit, order, strict });
  }

  searchAlbum(
    query: string,
    order: string,
    limit: number,
    index: number,
    strict: boolean
  ): Promise<DzDataPage<DzAlbum>> {
    let url = "search/track?q=" + query;
    return this.call(url, { index, limit, order, strict });
  }

  async call<T>(url: string, options?: RequestProps): Promise<T> {
    if (!url.includes("?")) url = url + "?";
    if (options?.index && options.index !== 0)
      url = url + "&index=" + options.index;
    if (options?.limit && options.limit !== 0)
      url = url + "&limit=" + options.limit;
    if (options?.order) url = url + "&order=" + options.order;
    if (options?.strict) url = url + "&strict=on";
    if (url.endsWith("?")) url = url.slice(0, -1);

    const res = await fetch(apiUrl + url);

    // @ts-ignore
    return await res.json();
  }
}
