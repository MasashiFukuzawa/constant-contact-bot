import { DearestCreateUseCaseInterface } from "../../../use_case/dearest/create/dearest_create_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { DearestCreatePresenterInterface } from "../../../use_case/dearest/create/dearest_create_presenter_interface";
import { DearestCreateOutputData } from "../../../use_case/dearest/create/dearest_create_output_data";

export class DearestCreateInteractor implements DearestCreateUseCaseInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
    private readonly dearestCreatePresenter: DearestCreatePresenterInterface
  ) {}

  handle(
    replyToken: string,
    name: string,
    typeId: number,
    notificationPeriodId: number,
    lastContactedDate: Date
  ): void {
    const dearestCreateOutputData = new DearestCreateOutputData();
    const dearest = this.dearestRepository.create(name, typeId, notificationPeriodId, lastContactedDate);
    let outputData: string;
    if (dearest) {
      outputData = dearestCreateOutputData.getMessage(dearest);
    } else {
      outputData = dearestCreateOutputData.getErrorMessage();
    }
    this.dearestCreatePresenter.replyMessage(replyToken, outputData);
  }
}
