import { LineDearestPushView } from "./line_view/line_dearest_push_view";

export class DearestPushViewModel {
  // 最初は、Subscriberという抽象クラスを用意していた＆subscribersはベタ書きしていなかったが、
  // GASに変換するとファイルが読み込まれないエラーが出たので応急処置的に具象クラスを直書きしている
  private readonly subscribers = [new LineDearestPushView()];

  pushMessages(names: string[]): void {
    this.subscribers.forEach((s) => {
      s.pushMessages(names);
      console.log(`${s.toString()} にメッセージを送信しました`);
    });
  }
}
