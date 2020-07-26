export class DearestTypeId {
  typeId: number;
  constructor(typeId: number) {
    if (typeId === null) throw new Error("DearestTypeIdが存在しません");
    this.typeId = typeId;
  }

  toNumber(): number {
    return this.typeId;
  }
}
