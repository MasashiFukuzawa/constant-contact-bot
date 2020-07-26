import { DearestPushUseCaseInterface } from "../../../use_case/dearest/push/dearest_push_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { NotificationPeriodRepositoryInterface } from "../../domain/notification_period/notification_period_repository_interface";
import { DearestPushPresenterInterface } from "../../../use_case/dearest/push/dearest_push_presenter_interface";
import { Dearest } from "../../domain/dearest/dearest";
import { NotificationPeriod } from "../../domain/notification_period/notification_period";

export class DearestPushInteractor implements DearestPushUseCaseInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
    private readonly notificationPeriodRepository: NotificationPeriodRepositoryInterface,
    private readonly dearestPushPresenter: DearestPushPresenterInterface
  ) {}

  handle(): void {
    const rawDearestData = this.dearestRepository.getAll();
    const mappedDearestsData = this.mapRawDearestData(rawDearestData);

    const rawNotificationPeriodData = this.notificationPeriodRepository.getAll();
    const mappedNotificationPeriodsData = this.mapRawNotificationPeriodData(rawNotificationPeriodData);

    const names = this.extractDearestNames(mappedDearestsData, mappedNotificationPeriodsData);
    this.dearestPushPresenter.pushMessages(names);
  }

  private mapRawDearestData(rawData: any[][]): Dearest[] {
    return rawData.map((d) => {
      return new Dearest(d[0], d[1], d[2], d[3], d[4]);
    });
  }

  private mapRawNotificationPeriodData(rawData: any[][]): NotificationPeriod[] {
    return rawData.map((d) => {
      return new NotificationPeriod(d[0], d[1], d[2]);
    });
  }

  private extractDearestNames(
    mappedDearestsData: Dearest[],
    mappedNotificationPeriodsData: NotificationPeriod[]
  ): string[] {
    const targetData = this.filterDearestData(mappedDearestsData, mappedNotificationPeriodsData);
    return targetData.map((d) => d.getName().toString());
  }

  private filterDearestData(
    mappedDearestsData: Dearest[],
    mappedNotificationPeriodsData: NotificationPeriod[]
  ): Dearest[] {
    return mappedDearestsData.filter((d) => {
      const notificationPeriodId = d.getNotificationPeriodId().toNumber();
      const lastContactedDate = d.getLastContactedDate().toDate();
      const now = Moment.moment();
      const notificationPeriod = this.getNotificationPeriod(notificationPeriodId, mappedNotificationPeriodsData);
      const targetDate: Date =
        now.subtract(
          notificationPeriod.getTerm().toNumber(),
          notificationPeriod.getUnit().toString()
        ).toDate();
      return lastContactedDate < targetDate;
    })
  }

  private getNotificationPeriod(
    notificationPeriodId: number,
    mappedNotificationPeriodsData: NotificationPeriod[]
  ): NotificationPeriod {
    return this.selectNotificationPeriodData(mappedNotificationPeriodsData, notificationPeriodId);
  }

  private selectNotificationPeriodData(
    mappedNotificationPeriodsData: NotificationPeriod[],
    notificationPeriodId: number
  ): NotificationPeriod {
    const selectedData = mappedNotificationPeriodsData.filter((d) => {
      return d.getId().toNumber() === notificationPeriodId;
    })[0];
    if (selectedData === null) {
      throw new Error('notification_periodsテーブル中に、該当するNotificationPeriodが見つかりませんでした');
    };
    return selectedData;
  }
}
