export class DearestId {
  id: number;
  constructor(id: number) {
    if (!id) throw new Error("DearestIdが存在しません");
    if (typeof id !== 'number') throw new Error("DearestIdはnumber型でなければなりません");
    this.id = id;
  }

  toNumber(): number {
    return this.id;
  }
}
