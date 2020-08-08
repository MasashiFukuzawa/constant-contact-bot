import { DearestPushPresenterInterface } from "../../../use_case/dearest/dearest_push_presenter_interface";
import { DearestPushViewModel } from "../view_model/dearest_push_view_model";

export class DearestPushPresenter implements DearestPushPresenterInterface {
  pushMessages(data: { name: string, message: string }[]): void {
    const publisher = new DearestPushViewModel();
    publisher.pushMessages(data);
  }
}
