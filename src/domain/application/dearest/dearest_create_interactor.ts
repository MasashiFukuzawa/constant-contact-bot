import { DearestCreateUseCaseInterface } from "../../../use_case/dearest/create/dearest_create_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { DearestCreatePresenterInterface } from "../../../use_case/dearest/create/dearest_create_presenter_interface";
import { DearestCreateOutputData } from "../../../use_case/dearest/create/dearest_create_output_data";
import { Dearest } from "../../domain/dearest/dearest";

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
    const isUnique = !this.dearestRepository.findByName(name);
    const validation = Dearest.isValid(name, typeId, notificationPeriodId, lastContactedDate);
    const dearestCreateOutputData = new DearestCreateOutputData();
    let outputData: string = null;
    if (isUnique && validation.isValid) {
      const dearest = this.dearestRepository.create(name, typeId, notificationPeriodId, lastContactedDate);
      outputData = dearestCreateOutputData.getMessage(dearest);
    } else {
      outputData = validation.errorMessage;
    }
    this.dearestCreatePresenter.replyMessage(replyToken, outputData);
  }
}
