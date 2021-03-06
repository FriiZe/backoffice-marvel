import { Attr } from "@vuex-orm/core";
import Model, { ModelFields } from "./model";
import { ModelsRelation } from "./models-types";

export interface ComicFields extends ModelFields {
  title: string;
  description: string;
  thumbnail: Thumbnail;
  prices: Price[];
  characters: ModelsRelation;
}

export interface ApiResponse<T> {
  entity: T[];
  total: number;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Price {
  type: string;
  price: number;
}

export default class Comic extends Model implements ComicFields {
  public title!: string;
  public description!: string;
  public thumbnail!: Thumbnail;
  public prices!: Price[];
  public characters!: ModelsRelation;

  static fields(): Record<keyof ComicFields, Attr> {
    return {
      id: this.attr(null),
      title: this.attr(""),
      description: this.attr(""),
      thumbnail: this.attr(""),
      prices: this.attr(""),
      characters: this.attr("")
    };
  }
}

Comic.entity = "comics";
