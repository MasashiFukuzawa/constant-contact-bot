import { NotificationPeriod } from "./notification_period";

export class NotificationPeriodRepositoryInterface {
  getAll(): readonly NotificationPeriod[];
}
