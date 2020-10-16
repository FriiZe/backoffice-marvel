import { Attr } from "@vuex-orm/core";

import Model, { ModelFields } from "./model";

export interface CharacterFields extends ModelFields {
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

export interface ApiResponse<T> {
  entity: T[];
  total: number;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export default class Character extends Model implements CharacterFields {
  public name!: string;
  public description!: string;
  public thumbnail!: Thumbnail;

  static fields(): Record<keyof CharacterFields, Attr> {
    return {
      id: this.attr(null),
      name: this.attr(""),
      description: this.attr(""),
      thumbnail: this.attr("")
    };
  }
}

Character.entity = "characters";
