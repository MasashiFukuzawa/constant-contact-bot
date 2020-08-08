import { DearestId } from './value_object/dearest_id'
import { DearestName } from './value_object/dearest_name';
import { DearestTypeId } from './value_object/dearest_type_id';
import { DearestNotificationPeriodId } from './value_object/dearest_notification_period_id';
import { DearestLastContactedDate } from './value_object/dearest_last_contacted_date';
import { DearestBirthday } from './value_object/dearest_birthday';

export class Dearest {
  private readonly id: DearestId;
  private readonly name: DearestName;
  private typeId: DearestTypeId;
  private notificationPeriodId: DearestNotificationPeriodId;
  private lastContactedDate: DearestLastContactedDate;
  private birthday: DearestBirthday;
  constructor(
    id: number,
    name: string,
    typeId: number,
    notificationPeriodId: number,
    lastContactedDate: Date,
    birthday: string
  ) {
    this.id = new DearestId(id);
    this.name = new DearestName(name);
    this.typeId = new DearestTypeId(typeId);
    this.notificationPeriodId = new DearestNotificationPeriodId(notificationPeriodId);
    this.lastContactedDate = new DearestLastContactedDate(lastContactedDate);
    this.birthday = new DearestBirthday(birthday);
  }

  getId(): DearestId {
    return this.id;
  }

  getName(): DearestName {
    return this.name;
  }

  getTypeId(): DearestTypeId {
    return this.typeId;
  }

  setTypeId(typeId: number): void {
    this.typeId = new DearestTypeId(typeId);
  }

  getNotificationPeriodId(): DearestNotificationPeriodId {
    return this.notificationPeriodId;
  }

  setNotificationPeriodId(notificationPeriodId: number): void {
    this.notificationPeriodId = new DearestNotificationPeriodId(notificationPeriodId);
  }

  getLastContactedDate(): DearestLastContactedDate {
    return this.lastContactedDate;
  }

  setLastContactedDate(date: Date): void {
    this.lastContactedDate = new DearestLastContactedDate(date);
  }

  getBirthday(): DearestBirthday {
    return this.birthday;
  }

  setBirthday(birthday: string): void {
    this.birthday = new DearestBirthday(birthday);
  }

  static issueNewDearestId(lastDearestId: number): number {
    return lastDearestId + 1;
  }

  static isValid(
    name: string,
    typeId: number,
    notificationPeriodId: number,
    lastContactedDate: Date,
    birthday: string
  ): { isValid: boolean, errorMessage: string | null } {
    try {
      new DearestName(name);
      new DearestTypeId(typeId);
      new DearestNotificationPeriodId(notificationPeriodId);
      new DearestLastContactedDate(lastContactedDate);
      new DearestBirthday(birthday);
      return { isValid: true, errorMessage: null };
    } catch(e) {
      return { isValid: false, errorMessage: e };
    }
  }

  static isUnique(dearest: Dearest): { isUnique: boolean, errorMessage: string | null } {
    try {
      const name = dearest.getName().toString;
      if (!!name) throw new Error(`Unique制約に引っ掛かりました。${name} は既に登録されています`);
      return { isUnique: true, errorMessage: null };
    } catch(e) {
      return { isUnique: false, errorMessage: e };
    }
  }

  static exists(dearest: Dearest): { isValid: boolean, errorMessage: string | null } {
    try {
      const name = dearest.getName().toString;
      if (!name) throw new Error(`${name} という名前で登録されているDearestは存在しません`);
      return { isValid: true, errorMessage: null };
    } catch(e) {
      return { isValid: false, errorMessage: e };
    }
  }
}
