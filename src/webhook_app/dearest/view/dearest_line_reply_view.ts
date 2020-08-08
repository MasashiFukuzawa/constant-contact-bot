import { Line } from "../../../constants/constants";
import { LineReplyViewComponent } from "./view_component/line/line_component";

export class DearestLineReplyView {
  replyMessage(replyToken: string, message: string): void {
    const line = new LineReplyViewComponent();
    const replyData = line.getReplyData(replyToken, message);
    UrlFetchApp.fetch(Line.REPLY_URL, line.getOptions(replyData));
  }

  getProviderName(): string {
    return Line.PROVIDER_NAME;
  }
}
