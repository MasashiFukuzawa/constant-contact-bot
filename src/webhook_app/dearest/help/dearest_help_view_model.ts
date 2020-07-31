import { LineDearestHelpView } from "./views/line_dearest_help_view";

export class DearestHelpViewModel {
  private readonly subscribers = [new LineDearestHelpView()];

  replyMessage(replyToken: string, helpMessage: string): void {
    this.subscribers.forEach((s) => {
      s.replyMessage(replyToken, helpMessage);
      console.log(`${s.getProviderName()} にメッセージを送信しました`);
    });
  }
}
