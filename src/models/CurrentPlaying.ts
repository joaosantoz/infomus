export interface CurrentPlaying {
    timestamp: number;
    context: Context;
    progress_ms: number;
    item: Item;
    currently_playing_type: string;
    actions: Actions;
    is_playing: boolean;
  }
  export interface Context {
    external_urls: ExternalUrls;
    href: string;
    type: string;
    uri: string;
  }
  export interface ExternalUrls {
    spotify: string;
  }
  export interface Item {
    album: Album;
    artists?: Array<ArtistsEntity> | null;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  }
  export interface Album {
    album_type: string;
    artists?: Array<ArtistsEntity> | null;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images?: Array<ImagesEntity> | null;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }
  export interface ArtistsEntity {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  export interface ImagesEntity {
    height: number;
    url: string;
    width: number;
  }
  export interface ExternalIds {
    isrc: string;
  }
  export interface Actions {
    disallows: Disallows;
  }
  export interface Disallows {
    resuming: boolean;
  }
  