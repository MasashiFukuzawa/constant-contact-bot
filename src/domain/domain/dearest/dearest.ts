import { DearestId } from './value_object/dearest_id'
import { DearestName } from './value_object/dearest_name';
import { DearestTypeId } from './value_object/dearest_type_id';
import { DearestNotificationPeriodId } from './value_object/dearest_notification_period_id';
import { DearestLastContactedDate } from './value_object/dearest_last_contacted_date';
import { DearestBirthday } from './value_object/dearest_birthday';

export class Dearest {
  private readonly id: DearestId;
  private readonly name: DearestName;
  private readonly typeId: DearestTypeId;
  private readonly notificationPeriodId: DearestNotificationPeriodId;
  private readonly lastContactedDate: DearestLastContactedDate;
  private readonly birthday: DearestBirthday;
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

  getNotificationPeriodId(): DearestNotificationPeriodId {
    return this.notificationPeriodId;
  }

  getLastContactedDate(): DearestLastContactedDate {
    return this.lastContactedDate;
  }

  getBirthday(): DearestBirthday {
    return this.birthday;
  }

  isBirthday(): boolean {
    const today: string = Moment.moment().format('M/D');
    const birthday = this.getBirthday().toString();
    return today === birthday;
  }

  existsName(): { isValid: boolean, errorMessage: string | null } {
    try {
      const name = this?.getName()?.toString;
      if (!name) throw new Error(`${name} という名前で登録されているDearestは存在しません`);
      return { isValid: true, errorMessage: null };
    } catch(e) {
      return { isValid: false, errorMessage: e };
    }
  }

  existsBirthday(): boolean {
    return !this.getBirthday();
  }

  static isUnique(dearest: Dearest): { isValid: boolean, errorMessage: string | null } {
    try {
      if (dearest) throw new Error(`Unique制約に引っ掛かりました。${dearest.getName().toString()} は既に登録されています`);
      return { isValid: true, errorMessage: null };
    } catch(e) {
      return { isValid: false, errorMessage: e };
    }
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
}
