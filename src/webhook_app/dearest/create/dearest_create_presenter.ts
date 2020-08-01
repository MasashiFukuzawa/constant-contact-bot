import { DearestCreatePresenterInterface } from "../../../use_case/dearest/create/dearest_create_presenter_interface";
import { DearestCreateViewModel } from "./dearest_create_view_model";

export class DearestCreatePresenter implements DearestCreatePresenterInterface {
  replyMessage(replyToken: string, message: string): void {
    const publisher = new DearestCreateViewModel();
    publisher.replyMessage(replyToken, message);
  }
}
