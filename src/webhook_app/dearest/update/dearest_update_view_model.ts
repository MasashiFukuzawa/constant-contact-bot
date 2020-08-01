import { LineDearestUpdateView } from "./views/line_dearest_update_view";

export class DearestUpdateViewModel {
  private readonly subscribers = [new LineDearestUpdateView()];

  replyMessage(replyToken: string, message: string): void {
    this.subscribers.forEach(e => {
      e.replyMessage(replyToken, message);
      console.log(`${e.getProviderName()} にメッセージを送信しました`);
    });
  }
}
