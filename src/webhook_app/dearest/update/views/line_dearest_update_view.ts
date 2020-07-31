import { Line } from "../../../../constants/constants";
import { LineAuthorization } from "../../../authorization/line_authorization";

export class LineDearestUpdateView {
  showMessage(message: string): void {
    UrlFetchApp.fetch(Line.PUSH_URL, this.setOptions(message));
  }

  toString(): string {
    return Line.PROVIDER_NAME;
  }

  private setOptions(message: string): object {
    const postData = this.setPostData(message);
    return {
      "method": "post",
      "headers": new LineAuthorization().getHeaders(),
      "payload": JSON.stringify(postData)
    };
  }

  private setPostData(message: string): object {
    return {
      "to": new LineAuthorization().getUserId(),
      "messages": [{
        "type": "template",
        "altText": "久しぶりに大切な人に連絡を取りましょう\uDBC0\uDC40",
        "template": {
          "type": "confirm",
          "text": `久しぶりに ${message} に連絡を取ってみませんか？`,
          "actions": [
            {
              "type": "message",
              "label": "Thanks",
              "text": "See you again!"
            },
            {
              "type": "postback",
              "label": "Update",
              "data": `message=${message}`,
              "showText": "Updating database..."
            }
          ],
        },
      }]
    };
  }
}
