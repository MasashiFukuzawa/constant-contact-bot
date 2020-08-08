export class DearestName {
  name: string;
  constructor(name: string) {
    if (!name) throw new Error("DearestNameが存在しません");
    if (typeof name !== 'string') throw new Error("DearestNameはstring型でなければなりません");
    this.name = name;
  }

  toString(): string {
    return this.name;
  }
}
