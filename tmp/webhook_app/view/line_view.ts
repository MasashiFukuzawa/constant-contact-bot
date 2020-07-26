import { Subscriber } from './subscriber'

export class LineView extends Subscriber {
  pushMessages(names: string[]): void {
    names.forEach((name) => {
      UrlFetchApp.fetch(Line.PUSH_URL, this.setOptions(name));
    });
  }

  private setOptions(name: string): object {
    const postData = this.setPostData(name);
    return {
      "method": "post",
      "headers": Line.HEADERS,
      "payload": JSON.stringify(postData)
    };
  }

  private setPostData(name: string): object {
    return {
      "to": Line.USER_ID,
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
