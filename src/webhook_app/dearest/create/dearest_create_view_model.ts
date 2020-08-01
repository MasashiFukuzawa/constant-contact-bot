import { LineDearestCreateView } from "./views/line_dearest_create_view";

export class DearestCreateViewModel {
  private readonly subscribers = [new LineDearestCreateView()];

  replyMessage(replyToken: string, message: string): void {
    this.subscribers.forEach(e => {
      e.replyMessage(replyToken, message);
      console.log(`${e.getProviderName()} にメッセージを送信しました`);
    });
  }
}
