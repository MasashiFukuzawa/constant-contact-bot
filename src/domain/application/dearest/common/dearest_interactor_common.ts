import { Dearest } from "../../../domain/dearest/dearest";
import { Type } from "../../../domain/type/type";
import { NotificationPeriod } from "../../../domain/notification_period/notification_period";

export class DearestInteractorCommon {
  static mapRawDearestData(rawData: any[][]): Dearest[] {
    return rawData.map((d) => {
      return new Dearest(d[0], d[1], d[2], d[3], d[4]);
    });
  }

  static mapRawTypeData(rawData: any[][]): Type[] {
    return rawData.map((d) => {
      return new Type(d[0], d[1]);
    });
  }

  static mapRawNotificationPeriodData(rawData: any[][]): NotificationPeriod[] {
    return rawData.map((d) => {
      return new NotificationPeriod(d[0], d[1], d[2]);
    });
  }
}