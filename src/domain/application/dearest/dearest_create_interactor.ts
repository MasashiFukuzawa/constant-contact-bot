import { DearestCreateUseCaseInterface } from "../../../use_case/dearest/create/dearest_create_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { DearestCreateOutputData } from "../../../use_case/dearest/create/dearest_create_output_data";
import { DearestReplyPresenterInterface } from "../../../use_case/dearest/dearest_reply_presenter_interface";
import { Dearest } from "../../domain/dearest/dearest";

export class DearestCreateInteractor implements DearestCreateUseCaseInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
    private readonly dearestReplyPresenter: DearestReplyPresenterInterface
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
    if (!uniqueness.isValid) {
      return this.dearestReplyPresenter.replyMessage(replyToken, uniqueness.errorMessage);
    }

    const validation = Dearest.isValid(name, typeId, notificationPeriodId, lastContactedDate, birthday);
    if (!validation.isValid) {
      return this.dearestReplyPresenter.replyMessage(replyToken, validation.errorMessage);
    }

    const createdDearest = this.dearestRepository.create(name, typeId, notificationPeriodId, lastContactedDate, birthday);
    this.dearestReplyPresenter.replyMessage(replyToken, new DearestCreateOutputData().getMessage(createdDearest));
  }
}
