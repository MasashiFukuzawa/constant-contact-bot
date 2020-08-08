import { DearestHelpUseCaseInterface } from "../../../use_case/dearest/help/dearest_help_use_case_interface";
import { DearestHelpOutputData } from "../../../use_case/dearest/help/dearest_help_output_data";
import { DearestReplyPresenterInterface } from "../../../use_case/dearest/dearest_reply_presenter_interface";

export class DearestHelpInteractor implements DearestHelpUseCaseInterface {
  constructor(
    private readonly dearestReplyPresenter: DearestReplyPresenterInterface
  ) {}

  handle(replyToken: string): void {
    const dearestHelpOutputData = new DearestHelpOutputData();
    const helpMessage = dearestHelpOutputData.getMessage();
    this.dearestReplyPresenter.replyMessage(replyToken, helpMessage);
  }
}
