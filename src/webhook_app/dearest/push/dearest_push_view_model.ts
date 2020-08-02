import { LineDearestPushView } from "./views/line_dearest_push_view";

export class DearestPushViewModel {
  private readonly subscribers = [new LineDearestPushView()];

  pushMessages(data: { name: string, message: string }[]): void {
    this.subscribers.forEach(e => {
      e.pushMessages(data);
      console.log(`${e.getProviderName()} にメッセージを送信しました`);
    });
  }
}
