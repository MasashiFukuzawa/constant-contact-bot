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
    lastContactedDate: Date,
    birthday: string
  ): void {
    const dearest = this.dearestRepository.findByName(name);
    const uniqueness = Dearest.isUnique(dearest);
    const validation = Dearest.isValid(name, typeId, notificationPeriodId, lastContactedDate, birthday);
    const createdDearest = uniqueness.isUnique && validation.isValid ?
      this.dearestRepository.create(name, typeId, notificationPeriodId, lastContactedDate, birthday) : null;

    const outputData = new DearestCreateOutputData();
    const message = createdDearest ?
      outputData.getMessage(createdDearest) :
      outputData.getErrorMessage(uniqueness.errorMessage, validation.errorMessage);

    console.log(message);
    this.dearestCreatePresenter.replyMessage(replyToken, message);
  }
}
