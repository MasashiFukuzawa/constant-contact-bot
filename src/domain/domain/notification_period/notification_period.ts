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

  static exists(
    notificationPeriods: NotificationPeriod[],
    notificationPeriodId: number
  ): { isValid: boolean, errorMessage: string | null } {
    try {
      const targetNotificationPeriods = notificationPeriods.filter(e => e.getId().toNumber() === notificationPeriodId);
      if (targetNotificationPeriods.length === 0) {
        new Error(`notification_periodsテーブル中に、NotificationPeriodId = ${notificationPeriodId} は存在しません`);
      }
      return { isValid: true, errorMessage: null };
    } catch(e) {
      return { isValid: false, errorMessage: e };
    }
  }
}
