export class DearestTypeId {
  typeId: number;
  constructor(typeId: number) {
    if (typeId === null) throw new Error("DearestTypeIdが存在しません");
    if (typeof typeId !== 'number') throw new Error("DearestTypeIdはnumber型でなければなりません");
    this.typeId = typeId;
  }

  toNumber(): number {
    return this.typeId;
  }
}
