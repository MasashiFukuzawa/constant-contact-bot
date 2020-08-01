import { LineDearestDeleteView } from "./views/line_dearest_delete_view";

export class DearestDeleteViewModel {
  private readonly subscribers = [new LineDearestDeleteView()];

  replyMessage(replyToken: string, message: string): void {
    this.subscribers.forEach(e => {
      e.replyMessage(replyToken, message);
      console.log(`${e.getProviderName()} にメッセージを送信しました`);
    });
  }
}
