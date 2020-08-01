import { Line } from "../../../../constants/constants";
import { LineViewComponent } from "../../../view_component/line_view_component";

export class LineDearestCreateView {
  replyMessage(replyToken: string, message: string): void {
    const line = new LineViewComponent();
    const replyData = line.getReplyData(replyToken, message);
    UrlFetchApp.fetch(Line.REPLY_URL, line.getOptions(replyData));
  }

  getProviderName(): string {
    return Line.PROVIDER_NAME;
  }
}
