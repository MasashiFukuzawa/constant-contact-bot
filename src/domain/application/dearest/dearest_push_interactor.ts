import { DearestPushUseCaseInterface } from "../../../use_case/dearest/push/dearest_push_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { NotificationPeriodRepositoryInterface } from "../../domain/notification_period/notification_period_repository_interface";
import { DearestPushPresenterInterface } from "../../../use_case/dearest/dearest_push_presenter_interface";
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
    dearests: readonly Dearest[],
    notificationPeriods: readonly NotificationPeriod[]
  ): { name: string, message: string }[] {
    const outputData = new DearestPushOutputData();
    const messages = dearests.map(e => {
      const name = e.getName().toString();
      if (e.isBirthday()) {
        return { name, message: outputData.getBirthdayMessage(name) };
      }

      const notificationPeriod = NotificationPeriod.findTargetNotificationPeriod(
        notificationPeriods,
        e.getNotificationPeriodId().toNumber()
      );
      if (notificationPeriod.shouldContact(e.getLastContactedDate().toDate())) {
        return {
          name,
          message: outputData.getDefaultMessage(
            name,
            notificationPeriod.getTerm().toNumber(),
            notificationPeriod.getUnit().toString()
          )
        };
      }
    });

    return messages.filter(e => !!e);
  }
}
