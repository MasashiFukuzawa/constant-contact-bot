import { Dearest } from '../../types/dearest';
import { DearestApplicationServiceInterface } from '../../interface/dearest/dearest_application_serviceInterface';
import { DearestRepositoryInterface } from '../../interface/dearest/deareast_repository_interface';
import { NotificationPeriod } from '../../types/notification_period';
import { NotificationPeriodApplicationService } from './notification_period_application_service';
import { NotificationPeriodRepository } from '../../repository/notification_periods_repository';

export class DearestApplicationService implements DearestApplicationServiceInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
  ) {}

  getNames(): string[] {
    const rawData = this.dearestRepository.getAllDearestsData();
    const allDearestsData = this.convertToHash(rawData);
    const targetData = this.filterDearestData(allDearestsData);
    return targetData.map((d) => d.name);
  }

  private convertToHash(rawData: any[][]): Dearest[] {
    return rawData.map((d) => {
      return {
        id: d[0],
        name: d[1],
        type_id: d[2],
        notification_period_id: d[3],
        last_contacted_date: d[4]
      };
    });
  }

  private filterDearestData(allDearestsData: Dearest[]): Dearest[] {
    return allDearestsData.filter((d) => {
      const now = Moment.moment();
      const notificationPeriod = this.getNotificationPeriod(d.notification_period_id);
      const targetDate: Date = now.subtract(notificationPeriod.term, notificationPeriod.unit).toDate();
      return d.last_contacted_date < targetDate;
    })
  }

  private getNotificationPeriod(notificationPeriodId: number): NotificationPeriod {
    const notificationPeriodRepository = new NotificationPeriodRepository();
    const notificationPeriodApplicationService = new NotificationPeriodApplicationService(notificationPeriodRepository);
    return notificationPeriodApplicationService.getNotificationPeriod(notificationPeriodId);
  }
}
