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