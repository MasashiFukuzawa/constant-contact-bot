import { DearestDeletePresenterInterface } from "../../../use_case/dearest/delete/dearest_delete_presenter_interface";
import { DearestDeleteViewModel } from "./dearest_delete_view_model";

export class DearestDeletePresenter implements DearestDeletePresenterInterface {
  replyMessage(replyToken: string, message: string): void {
    const publisher = new DearestDeleteViewModel();
    publisher.replyMessage(replyToken, message);
  }
}
