import { LineAuthorization } from "../../../authorization/line_authorization";

const PROVIDER_NAME = 'LINE';
const PUSH_URL = "https://api.line.me/v2/bot/message/push";

export class LineDearestPushView {
  pushMessages(names: string[]): void {
    names.forEach((name) => {
      UrlFetchApp.fetch(PUSH_URL, this.setOptions(name));
    });
  }

  toString(): string {
    return PROVIDER_NAME;
  }

  private setOptions(name: string): object {
    const postData = this.setPostData(name);
    return {
      "method": "post",
      "headers": new LineAuthorization().getHeaders(),
      "payload": JSON.stringify(postData)
    };
  }

  private setPostData(name: string): object {
    return {
      "to": new LineAuthorization().getUserId(),
      "messages": [{
        "type": "template",
        "altText": "久しぶりに大切な人に連絡を取りましょう\uDBC0\uDC40",
        "template": {
          "type": "confirm",
          "text": `久しぶりに ${name} に連絡を取ってみませんか？`,
          "actions": [
            {
              "type": "message",
              "label": "Thanks",
              "text": "See you again!"
            },
            {
              "type": "postback",
              "label": "Update",
              "data": `name=${name}`,
              "displayText": "Updating database..."
            }
          ],
        },
      }]
    };
  }
}
