import { Line } from "../../../constants/constants";
import { LinePushViewComponent } from "./view_component/line/line_component";

export class DearestLinePushView {
  pushMessages(data: { name: string, message: string }[]): void {
    const line = new LinePushViewComponent();
    const altText = this.getAltText();
    data.forEach(e => {
      const postData = line.getConfirmTypePushData(altText, e.message, this.getActions(e.name));
      UrlFetchApp.fetch(Line.PUSH_URL, line.getOptions(postData));
    });
  }

  getProviderName(): string {
    return Line.PROVIDER_NAME;
  }

  private getAltText(): string {
    return "久しぶりに大切な人に連絡を取りましょう\uDBC0\uDC40";
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
