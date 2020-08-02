import { DearestPushUseCaseInterface } from "../../../use_case/dearest/push/dearest_push_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { NotificationPeriodRepositoryInterface } from "../../domain/notification_period/notification_period_repository_interface";
import { DearestPushPresenterInterface } from "../../../use_case/dearest/push/dearest_push_presenter_interface";
import { DearestPushOutputData } from "../../../use_case/dearest/push/dearest_push_output_data";
import { Dearest } from "../../domain/dearest/dearest";
import { NotificationPeriod } from "../../domain/notification_period/notification_period";

export class DearestPushInteractor implements DearestPushUseCaseInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
    private readonly notificationPeriodRepository: NotificationPeriodRepositoryInterface,
    private readonly dearestPushPresenter: DearestPushPresenterInterface
  ) {}

  handle(): void {
    const dearests = this.dearestRepository.getAll();
    const notificationPeriods = this.notificationPeriodRepository.getAll();
    const data = this.constructMessages(dearests, notificationPeriods);
    this.dearestPushPresenter.pushMessages(data);
  }

  private constructMessages(
    dearests: Dearest[],
    notificationPeriods: NotificationPeriod[]
  ): { name: string, message: string }[] {
    const outputData = new DearestPushOutputData();
    const messages = dearests.map(e => {
      const name = e.getName().toString();
      const birthday = e.getBirthday().toString();
      const today: string = Moment.moment().format('M/D');
      if (today === birthday) {
        return { name, message: outputData.getBirthdayMessage(name) };
      }

      const notificationPeriodId = e.getNotificationPeriodId().toNumber();
      const lastContactedDate = e.getLastContactedDate().toDate();
      const notificationPeriod = this.getNotificationPeriod(notificationPeriods, notificationPeriodId);
      const term = notificationPeriod.getTerm().toNumber();
      const unit = notificationPeriod.getUnit().toString();
      const now = Moment.moment();
      const targetDate: Date = now.subtract(term, unit).toDate();
      if (lastContactedDate < targetDate) {
        return { name, message: outputData.getDefaultMessage(name, term, unit) };
      }
    });
    return messages.filter(e => !!e);
  }

  private getNotificationPeriod(
    notificationPeriods: NotificationPeriod[],
    notificationPeriodId: number
  ): NotificationPeriod {
    const selectedData = notificationPeriods.filter(e => {
      return e.getId().toNumber() === notificationPeriodId;
    })[0];
    if (selectedData) {
      return selectedData;
    } else {
      const errorMessage = 'notification_periodsテーブル中に、該当するNotificationPeriodが見つかりませんでした';
      throw new Error(`${errorMessage}: notificationPeriodId = ${notificationPeriodId}`);
    };
  }
}
