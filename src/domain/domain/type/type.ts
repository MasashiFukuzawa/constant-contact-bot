import { TypeId } from "./value_object/type_id";
import { TypeDescription } from "./value_object/type_description";

export class Type {
  private id: TypeId;
  private unit: TypeDescription;
  constructor(id: number, Description: string) {
    this.id = new TypeId(id);
    this.unit = new TypeDescription(Description);
  }

  getId(): TypeId {
    return this.id;
  }

  getTypeDescription(): TypeDescription {
    return this.unit;
  }
}
