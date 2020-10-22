import { Model as VueXORMModel, Attr } from "@vuex-orm/core";
import { Request } from "@vuex-orm/plugin-axios";

import apiConnection from "@/config/apiConnection.json";

export enum searchField {
  comics = "title",
  characters = "name"
}

export interface ApiResponse<T> {
  entity: T[];
  total: number;
}

export interface ModelFields {
  id: string;
}

interface ModelClass<T extends Model> {
  new (): T;
  entity: string;
  api(): Request;
}

export default class Model extends VueXORMModel implements ModelFields {
  public id!: string;

  static fields(): Record<keyof ModelFields, Attr> {
    return {
      id: this.attr(null)
    };
  }

  static async fetchAll<T extends Model>(
    this: ModelClass<T>,
    pageNumber: number,
    name?: string
  ): Promise<ApiResponse<T>> {
    const res = await this.api().get(
      `${apiConnection.url}${this.entity}?${
        name ? `${searchField[this.entity]}StartsWith=${name}&` : ""
      }apikey=${apiConnection.publicKey}&limit=10&offset=${(pageNumber - 1) *
        10}`,
      {
        dataTransformer: res => {
          return res.data.data.results;
        }
      }
    );
    if (!res.entities) {
      throw new Error("No entities returned");
    }
    return (
      {
        entity: res.entities[this.entity] as T[],
        total: res.response.data.data.total as number
      } ?? []
    );
  }

  static async fetchById<T extends Model>(
    this: ModelClass<T>,
    id: string
  ): Promise<T | null> {
    const res = await this.api().get(
      `${apiConnection.url}${this.entity}/${id}?apikey=${apiConnection.publicKey}`,
      {
        dataTransformer: res => {
          return res.data.data.results;
        }
      }
    );
    if (!res.entities) {
      return null;
    }
    return res.entities[this.entity][0] as T;
  }

  get modelClass(): typeof Model {
    return this.constructor as typeof Model;
  }
}
