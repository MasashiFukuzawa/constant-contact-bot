import { DearestId } from './value_object/dearest_id'
import { DearestName } from './value_object/dearest_name';
import { DearestTypeId } from './value_object/dearest_type_id';
import { DearestNotificationPeriodId } from './value_object/dearest_notification_period_id';
import { DearestLastContactedDate } from './value_object/dearest_last_contacted_date';

export class Dearest {
  constructor(
    private id: DearestId,
    private name: DearestName,
    private typeId: DearestTypeId,
    private notificationPeriodId: DearestNotificationPeriodId,
    private lastContactedDate: DearestLastContactedDate
  ) {}

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
}
