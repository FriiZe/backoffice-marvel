export interface ModelsRelation {
  available: number;
  collectionURI: string;
  items: ModelRelation[];
  returned: number;
}

export interface ModelRelation {
  resourceURI: string;
  name: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export enum searchField {
  comics = "title",
  characters = "name"
}
