import { Line } from "../../../../constants/constants";
import { LineViewComponent } from "../../../view_component/line_view_component";

export class LineDearestHelpView extends LineViewComponent {
  replyMessage(replyToken: string, helpMessage: string): void {
    const replyData = this.getReplyData(replyToken, helpMessage);
    UrlFetchApp.fetch(Line.REPLY_URL, this.getOptions(replyData));
  }
}
