import { DearestUpdatePresenterInterface } from "../../../use_case/dearest/update/dearest_update_presenter_interface";
import { DearestUpdateViewModel } from "./dearest_update_view_model";

export class DearestUpdatePresenter implements DearestUpdatePresenterInterface {
  replyMessage(replyToken: string, message: string): void {
    const publisher = new DearestUpdateViewModel();
    publisher.replyMessage(replyToken, message);
  }
}
