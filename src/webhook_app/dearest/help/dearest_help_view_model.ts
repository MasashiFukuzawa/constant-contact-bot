import { LineDearestHelpView } from "./views/line_dearest_help_view";

export class DearestHelpViewModel {
  private readonly subscribers = [new LineDearestHelpView()];

  showHowToUse(helpMessage: string): void {
    this.subscribers.forEach((s) => {
      s.showHowToUse(helpMessage);
      console.log(`${s.toString()} にメッセージを送信しました`);
    });
  }
}
