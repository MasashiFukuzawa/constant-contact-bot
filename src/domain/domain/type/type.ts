import { TypeId } from "./value_object/type_id";
import { TypeDescription } from "./value_object/type_description";

export class Type {
  private readonly id: TypeId;
  private readonly unit: TypeDescription;
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

  static exists(types: Type[], typeId: number): { isValid: boolean, errorMessage: string | null } {
    try {
      const targetTypes = types.filter(e => e.getId().toNumber() === typeId);
      if (targetTypes.length === 0) {
        new Error(`typesテーブル中に、TypeId = ${typeId} は存在しません`);
      }
      return { isValid: true, errorMessage: null };
    } catch(e) {
      return { isValid: false, errorMessage: e };
    }
  }
}
