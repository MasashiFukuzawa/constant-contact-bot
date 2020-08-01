import { DearestId } from './value_object/dearest_id'
import { DearestName } from './value_object/dearest_name';
import { DearestTypeId } from './value_object/dearest_type_id';
import { DearestNotificationPeriodId } from './value_object/dearest_notification_period_id';
import { DearestLastContactedDate } from './value_object/dearest_last_contacted_date';

export class Dearest {
  private readonly id: DearestId;
  private readonly name: DearestName;
  private typeId: DearestTypeId;
  private notificationPeriodId: DearestNotificationPeriodId;
  private lastContactedDate: DearestLastContactedDate;
  constructor(id: number, name: string, typeId: number, notificationPeriodId: number, lastContactedDate: Date) {
    this.id = new DearestId(id);
    this.name = new DearestName(name);
    this.typeId = new DearestTypeId(typeId);
    this.notificationPeriodId = new DearestNotificationPeriodId(notificationPeriodId);
    this.lastContactedDate = new DearestLastContactedDate(lastContactedDate);
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

  static issueNewDearestId(lastDearestId: number): number {
    return lastDearestId + 1;
  }

  static isValid(name: string, typeId: number, notificationPeriodId: number, isUnique: boolean): boolean {
    return this.isNotNull(name, typeId, notificationPeriodId) && isUnique;
  }

  private static isNotNull(name: string, typeId: number, notificationPeriodId: number): boolean {
    return !!name || !!typeId || !!notificationPeriodId;
  }
}
