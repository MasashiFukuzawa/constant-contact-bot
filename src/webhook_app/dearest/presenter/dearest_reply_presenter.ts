import { DearestReplyViewModel } from '../view_model/dearest_reply_view_model';
import { DearestReplyPresenterInterface } from '../../../use_case/dearest/dearest_reply_presenter_interface';

export class DearestReplyPresenter implements DearestReplyPresenterInterface {
  replyMessage(replyToken: string, message: string): void {
    const publisher = new DearestReplyViewModel();
    publisher.replyMessage(replyToken, message);
  }
}
