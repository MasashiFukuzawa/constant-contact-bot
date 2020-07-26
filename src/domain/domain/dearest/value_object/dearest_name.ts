export class DearestName {
  name: string;
  constructor(name: string) {
    if (name === null) throw new Error("DearestNameが存在しません");
    this.name = name;
  }

  toString(): string {
    return this.name;
  }
}
