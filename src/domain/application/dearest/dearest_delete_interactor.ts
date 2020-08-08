import { DearestDeleteUseCaseInterface } from "../../../use_case/dearest/delete/dearest_delete_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { DearestReplyPresenterInterface } from "../../../use_case/dearest/dearest_reply_presenter_interface";
import { DearestDeleteOutputData } from "../../../use_case/dearest/delete/dearest_delete_output_data";

export class DearestDeleteInteractor implements DearestDeleteUseCaseInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
    private readonly dearestReplyPresenter: DearestReplyPresenterInterface
  ) {}

  handle(replyToken: string, name: string): void {
    const dearest = this.dearestRepository.findByName(name);
    const existence = dearest.existsName();
    const deletedDearest = existence.isValid ? this.dearestRepository.delete(dearest): null;

    const outputData = new DearestDeleteOutputData();
    const message = deletedDearest ? outputData.getMessage(dearest) : existence.errorMessage;

    this.dearestReplyPresenter.replyMessage(replyToken, message);
  }
}
