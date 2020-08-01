import { LineDearestPushView } from "./views/line_dearest_push_view";

export class DearestPushViewModel {
  private readonly subscribers = [new LineDearestPushView()];

  pushMessages(names: string[]): void {
    this.subscribers.forEach((s) => {
      s.pushMessages(names);
      console.log(`${s.getProviderName()} にメッセージを送信しました`);
    });
  }
}
