export interface User {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images?: Array<ImagesEntity> | null;
    product: string;
    type: string;
    uri: string;
  }

  export interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
  }

  export interface ExternalUrls {
    spotify: string;
  }

  export interface Followers {
    href?: null;
    total: number;
  }

  export interface ImagesEntity {
    height?: null;
    url: string;
    width?: null;
  }
  