import { NotificationPeriodId } from "./value_object/notification_period_id";
import { NotificationPeriodTerm } from "./value_object/notification_period_term";
import { NotificationPeriodUnit } from "./value_object/notification_period_unit";

export class NotificationPeriod {
  private id: NotificationPeriodId;
  private term: NotificationPeriodTerm;
  private unit: NotificationPeriodUnit;
  constructor(id: number, term: number, unit: string) {
    this.id = new NotificationPeriodId(id);
    this.term = new NotificationPeriodTerm(term);
    this.unit = new NotificationPeriodUnit(unit);
  }

  getId(): NotificationPeriodId {
    return this.id;
  }

  getTerm(): NotificationPeriodTerm {
    return this.term;
  }

  getUnit(): NotificationPeriodUnit {
    return this.unit;
  }
}
