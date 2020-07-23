import { DearestApplicationServiceInterface } from '../interface/dearest/dearestApplicationServiceInterface';
import { DearestClientInterface } from '../interface/dearest/dearestClientInterface';

export class Client implements DearestClientInterface {
  constructor(
    private dearestApplicationService: DearestApplicationServiceInterface
  ) {}

  postMessage(): void {
    const dearests = this.dearestApplicationService.getNames();
    dearests.forEach((d, i) => {
      if (i > 4) return;
      const dearest = d[0];
      UrlFetchApp.fetch(LineConstants.PUSH_URL, this.setOptions(dearest));
    });
  }

  private setOptions(dearest: string): object {
    const postData = this.setPostData(dearest);
    return {
      "method": "post",
      "headers": LineConstants.HEADERS,
      "payload": JSON.stringify(postData)
    };
  }

  private setPostData(dearest: string): object {
    return {
      "to": LineConstants.USER_ID,
      "messages": [{
        "type": "template",
        "altText": "久しぶりに大切な人に連絡を取りましょう\uDBC0\uDC40",
        "template": {
          "type": "confirm",
          "text": `${dearest}と3ヶ月以上連絡を取っていないようです。\n久しぶりに連絡を取ってみませんか？`,
          "actions": [
            {
              "type": "message",
              "label": "Thanks",
              "text": "See you again!"
            },
            {
              "type": "postback",
              "label": "Update",
              "data": `name=${dearest}`,
              "displayText": "Updating database..."
            }
          ],
        },
      }]
    };
  }
}
