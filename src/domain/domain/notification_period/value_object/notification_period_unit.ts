export class NotificationPeriodUnit {
  unit: string;
  constructor(unit: string) {
    if (!unit) throw new Error("NotificationPeriodUnitが存在しません");
    this.unit = unit;
  }

  toString(): string {
    return this.unit;
  }
}
