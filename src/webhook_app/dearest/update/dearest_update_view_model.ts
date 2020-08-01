import { LineDearestUpdateView } from "./views/line_dearest_update_view";

export class DearestUpdateViewModel {
  private readonly subscribers = [new LineDearestUpdateView()];

  replyMessage(replyToken: string, message: string): void {
    this.subscribers.forEach((s) => {
      s.replyMessage(replyToken, message);
      console.log(`${s.getProviderName()} にメッセージを送信しました`);
    });
  }
}
