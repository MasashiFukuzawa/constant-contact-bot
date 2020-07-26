export class DearestId {
  id: number;
  constructor(id: number) {
    if (id === null) throw new Error("DearestIdが存在しません");
    this.id = id;
  }

  toNumber(): number {
    return this.id;
  }
}
