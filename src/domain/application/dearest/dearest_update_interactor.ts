import { DearestUpdateUseCaseInterface } from "../../../use_case/dearest/update/dearest_update_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { DearestUpdateOutputData } from "../../../use_case/dearest/update/dearest_update_output_data";
import { DearestReplyPresenterInterface } from "../../../use_case/dearest/dearest_reply_presenter_interface";
import { Dearest } from "../../domain/dearest/dearest";

export class DearestUpdateInteractor implements DearestUpdateUseCaseInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
    private readonly dearestReplyPresenter: DearestReplyPresenterInterface
  ) {}

  handle(
    replyToken: string,
    name: string,
    typeId: number | null,
    notificationPeriodId: number | null,
    birthday: string | null
  ): void {
    const validation = Dearest.isValid(name, typeId, notificationPeriodId, new Date(), birthday);

    const dearest = this.dearestRepository.findByName(name);
    const existence = dearest.existsName();

    const updatedDearest = validation.isValid && existence.isValid ?
      this.dearestRepository.update(dearest, typeId, notificationPeriodId, birthday) : null;

    const outputData = new DearestUpdateOutputData();
    const message = updatedDearest ?
      outputData.getMessage(updatedDearest) : outputData.getErrorMessage(validation.errorMessage, existence.errorMessage);

    this.dearestReplyPresenter.replyMessage(replyToken, message);
  }
}
