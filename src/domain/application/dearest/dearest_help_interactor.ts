import { DearestHelpUseCaseInterface } from "../../../use_case/dearest/help/dearest_help_use_case_interface";
import { DearestHelpPresenterInterface } from "../../../use_case/dearest/help/dearest_help_presenter_interface";
import { DearestHelpOutputData } from "../../../use_case/dearest/help/dearest_help_output_data";

export class DearestHelpInteractor implements DearestHelpUseCaseInterface {
  constructor(
    private readonly dearestHelpPresenter: DearestHelpPresenterInterface
  ) {}

  handle(replyToken: string): void {
    const dearestHelpOutputData = new DearestHelpOutputData();
    const helpMessage = dearestHelpOutputData.getMessage();
    this.dearestHelpPresenter.replyMessage(replyToken, helpMessage);
  }
}
