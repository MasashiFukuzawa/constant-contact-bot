import { LineDearestHelpView } from "./views/line_dearest_help_view";

export class DearestHelpViewModel {
  private readonly subscribers = [new LineDearestHelpView()];

  replyMessage(replyToken: string, helpMessage: string): void {
    this.subscribers.forEach(e => {
      e.replyMessage(replyToken, helpMessage);
      console.log(`${e.getProviderName()} にメッセージを送信しました`);
    });
  }
}
