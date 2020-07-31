import { Line } from '../../constants/constants'
import { LineAuthorization } from '../authorization/line_authorization'

export class LineViewComponent {
  getOptions(data: object): object {
    return {
      method: "post",
      headers: new LineAuthorization().getHeaders(),
      payload: JSON.stringify(data)
    };
  }

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
