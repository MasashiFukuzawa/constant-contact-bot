import { LineDearestUpdateView } from "./views/line_dearest_update_view";

export class DearestUpdateViewModel {
  private readonly subscribers = [new LineDearestUpdateView()];

  showMessage(message: string): void {
    this.subscribers.forEach((s) => {
      s.showMessage(message);
      console.log(`${s.toString()} にメッセージを送信しました`);
    });
  }
}
