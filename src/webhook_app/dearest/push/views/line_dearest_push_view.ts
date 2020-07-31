import { Line } from "../../../../constants/constants";
import { LineViewComponent } from "../../../view_component/line_view_component";

export class LineDearestPushView extends LineViewComponent {
  pushMessages(names: string[]): void {
    const altText = this.getAltText();
    names.forEach((name) => {
      const postData = this.getConfirmTypePushData(
        altText,
        this.getText(name),
        this.getActions(name)
      );
      UrlFetchApp.fetch(Line.PUSH_URL, this.getOptions(postData));
    });
  }

  private getAltText(): string {
    return "久しぶりに大切な人に連絡を取りましょう\uDBC0\uDC40";
  }

  private getText(name: string): string {
    return `久しぶりに ${name} に連絡を取ってみませんか？`;
  }

  private getActions(name: string): object[] {
    return [
      {
        type: "message",
        label: "Thanks",
        text: "See you again!"
      },
      {
        type: "postback",
        label: "Update",
        data: `name=${name}`,
        showText: "Updating database..."
      }
    ]
  }
}
