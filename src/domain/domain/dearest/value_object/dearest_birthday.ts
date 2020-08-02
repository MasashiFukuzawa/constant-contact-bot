export class DearestBirthday {
  birthday: string;
  constructor(birthday: string) {
    if (birthday === null) return;
    if (typeof birthday !== 'string') throw new Error("DearestBirthdayはstring型でなければなりません");
    this.birthday = birthday;
  }

  toString(): string {
    return this.birthday;
  }
}
