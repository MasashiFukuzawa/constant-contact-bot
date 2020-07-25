import { NotificationPeriodId } from "./value_object/notification_period_id";
import { NotificationPeriodTerm } from "./value_object/notification_period_term";
import { NotificationPeriodUnit } from "./value_object/notification_period_unit";

export class NotificationPeriod {
  constructor(
    private id: NotificationPeriodId,
    private term: NotificationPeriodTerm,
    private unit: NotificationPeriodUnit
  ) {}

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
