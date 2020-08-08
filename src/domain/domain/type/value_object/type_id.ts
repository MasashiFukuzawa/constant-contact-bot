export class TypeId {
  id: number;
  constructor(id: number) {
    if (!id) throw new Error("TypeIdが存在しません");
    this.id = id;
  }

  toNumber(): number {
    return this.id;
  }
}
