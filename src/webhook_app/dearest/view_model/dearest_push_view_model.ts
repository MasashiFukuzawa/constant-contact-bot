import { PushSubscriber } from "../view/subscriber/subscribers";

export class DearestPushViewModel {
  pushMessages(data: { name: string, message: string }[]): void {
    PushSubscriber.subscribers.forEach(e => {
      e.pushMessages(data);
      console.log(`${e.getProviderName()} にメッセージを送信しました`);
    });
  }
}
