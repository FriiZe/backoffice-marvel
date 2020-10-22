import { Attr } from "@vuex-orm/core";

import Model, { ModelFields } from "./model";
import { ModelsRelation, Thumbnail } from "./models-types";

export interface CharacterFields extends ModelFields {
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: ModelsRelation;
}

export interface ApiResponse<T> {
  entity: T[];
  total: number;
}

export default class Character extends Model implements CharacterFields {
  public name!: string;
  public description!: string;
  public thumbnail!: Thumbnail;
  public comics!: ModelsRelation;

  static searchField = "title"

  static fields(): Record<keyof CharacterFields, Attr> {
    return {
      id: this.attr(null),
      name: this.attr(""),
      description: this.attr(""),
      thumbnail: this.attr(""),
      comics: this.attr("")
    };
  }
}

Character.entity = "characters";
