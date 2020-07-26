const PROVIDER_NAME = 'LINE';
const PUSH_URL = "https://api.line.me/v2/bot/message/push";

export class LineDearestPushView {
  private accessToken: string | null;
  private headers: {[key: string]: string} | null;
  private userId: string | null;
  constructor() {
    this.accessToken = null;
    this.headers = null;
    this.userId = null;
  }

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
      "headers": this.getHeaders(),
      "payload": JSON.stringify(postData)
    };
  }

  private setPostData(name: string): object {
    return {
      "to": this.getUserId(),
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

  private getAccessToken(): string {
    if (this.accessToken) return this.accessToken;
    this.setAccessToken();
    return this.accessToken;
  }

  private setAccessToken(): void {
    this.accessToken = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");
  }

  private getHeaders(): {[key: string]: string} {
    if (this.headers) return this.headers;
    this.setHeaders();
    return this.headers;
  }

  private setHeaders(): void {
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessToken()}`
    };
  }

  private getUserId(): string {
    if (this.userId) return this.userId;
    this.setUserId();
    return this.userId;
  }

  private setUserId(): void {
    this.userId = PropertiesService.getScriptProperties().getProperty("USER_ID");
  }
}
