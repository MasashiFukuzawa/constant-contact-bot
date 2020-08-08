import { ReplySubscriber } from "../view/subscriber/subscribers";

export class DearestReplyViewModel {
  replyMessage(replyToken: string, message: string): void {
    ReplySubscriber.subscribers.forEach(e => {
      e.replyMessage(replyToken, message);
      console.log(`${e.getProviderName()} にメッセージを送信しました`);
    });
  }
}
