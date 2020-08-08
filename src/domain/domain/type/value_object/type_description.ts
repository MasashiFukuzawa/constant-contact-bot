export class TypeDescription {
  Description: string;
  constructor(Description: string) {
    if (!Description) throw new Error("TypeDescriptionが存在しません");
    this.Description = Description;
  }

  toString(): string {
    return this.Description;
  }
}
