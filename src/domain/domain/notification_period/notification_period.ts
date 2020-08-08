import { NotificationPeriodId } from "./value_object/notification_period_id";
import { NotificationPeriodTerm } from "./value_object/notification_period_term";
import { NotificationPeriodUnit } from "./value_object/notification_period_unit";

export class NotificationPeriod {
  private readonly id: NotificationPeriodId;
  private readonly term: NotificationPeriodTerm;
  private readonly unit: NotificationPeriodUnit;
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

  shouldContact(lastContactedDate: Date): boolean {
    const term = this.getTerm().toNumber();
    const unit = this.getUnit().toString();
    const now = Moment.moment();
    const targetDate: Date = now.subtract(term, unit).toDate();
    return lastContactedDate < targetDate;
  }

  static findTargetNotificationPeriod(
    notificationPeriods: readonly NotificationPeriod[],
    notificationPeriodId: number
  ): NotificationPeriod {
    const targetNotificationPeriod = notificationPeriods.filter(e => e.getId().toNumber() === notificationPeriodId)[0];
    if (!targetNotificationPeriod) {
      throw new Error(`notification_periodsテーブル中に、NotificationPeriodId = ${notificationPeriodId} は存在しません`);
    }
    return targetNotificationPeriod;
  }
}
