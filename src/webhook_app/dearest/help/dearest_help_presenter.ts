import { DearestHelpPresenterInterface } from "../../../use_case/dearest/help/dearest_help_presenter_interface";
import { DearestHelpViewModel } from "./dearest_help_view_model";

export class DearestHelpPresenter implements DearestHelpPresenterInterface {
  showHowToUse(helpMessage: string): void {
    const publisher = new DearestHelpViewModel();
    publisher.showHowToUse(helpMessage);
  }
}
