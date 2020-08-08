import { LineAuthorization } from "../../../../authorization/line_authorization";

class LineBaseComponent {
  getOptions(data: object): object {
    return {
      method: "post",
      headers: new LineAuthorization().getHeaders(),
      payload: JSON.stringify(data)
    };
  }
}

export class LinePushViewComponent extends LineBaseComponent {
  getConfirmTypePushData(altText: string, text: string, actions: object[]): object {
    return {
      to: new LineAuthorization().getUserId(),
      messages: [{
        type: "template",
        altText: altText,
        template: {
          type: "confirm",
          text: text,
          actions: actions,
        },
      }]
    };
  }
}

export class LineReplyViewComponent extends LineBaseComponent {
  getReplyData(replyToken: string, message: string): object {
    return {
      replyToken: replyToken,
      messages: [
        {
          type: "text",
          text: message
        }
      ]
    };
  }
}