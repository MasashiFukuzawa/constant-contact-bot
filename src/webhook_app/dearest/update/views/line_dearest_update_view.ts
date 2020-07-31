import { Line } from "../../../../constants/constants";
import { LineViewComponent } from "../../../view_component/line_view_component";

export class LineDearestUpdateView extends LineViewComponent {
  replyMessage(replyToken: string, message: string): void {
    const replyData = this.getReplyData(replyToken, message);
    UrlFetchApp.fetch(Line.REPLY_URL, this.getOptions(replyData));
  }
}
