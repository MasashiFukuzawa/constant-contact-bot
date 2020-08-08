import { Type } from "./type";

export class TypeRepositoryInterface {
  getAll(): readonly Type[];
}
