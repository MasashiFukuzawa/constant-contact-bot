import { DearestPushPresenterInterface } from "../../../use_case/dearest/push/dearest_push_presenter_interface";
import { DearestPushViewModel } from "./dearest_push_view_model";

export class DearestPushPresenter implements DearestPushPresenterInterface {
  pushMessages(names: string[]): void {
    const publisher = new DearestPushViewModel();
    publisher.pushMessages(names);
  }
}
