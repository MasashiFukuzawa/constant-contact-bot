import { DearestPushUseCaseInterface } from "../../../use_case/dearest/push/dearest_push_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { NotificationPeriodRepositoryInterface } from "../../domain/notification_period/notification_period_repository_interface";
import { DearestPushPresenterInterface } from "../../../use_case/dearest/push/dearest_push_presenter_interface";
import { DearestPushOutputData } from "../../../use_case/dearest/push/dearest_push_output_data";

export class DearestPushInteractor implements DearestPushUseCaseInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
    private readonly notificationPeriodRepository: NotificationPeriodRepositoryInterface,
    private readonly dearestPushPresenter: DearestPushPresenterInterface
  ) {}

  handle(): void {
    const dearests = this.dearestRepository.getAll();
    const notificationPeriods = this.notificationPeriodRepository.getAll();
    const outputData = new DearestPushOutputData();
    const names = outputData.getNames(dearests, notificationPeriods);
    this.dearestPushPresenter.pushMessages(names);
  }
}
