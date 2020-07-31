import { Line } from "../../../../constants/constants";
import { LineAuthorization } from "../../../authorization/line_authorization";

export class LineDearestHelpView {
  showHowToUse(helpMessage: string): void {
    UrlFetchApp.fetch(Line.PUSH_URL, this.setOptions(helpMessage));
  }

  toString(): string {
    return Line.PROVIDER_NAME;
  }

  private setOptions(helpMessage: string): object {
    const postData = this.setPostData(helpMessage);
    return {
      "method": "post",
      "headers": new LineAuthorization().getHeaders(),
      "payload": JSON.stringify(postData)
    };
  }

  private setPostData(helpMessage: string): object {
    return {
      "to": new LineAuthorization().getUserId(),
      "messages": [{
        "type": "template",
        "altText": "How To Use LINE Commands",
        "template": {
          "type": "confirm",
          "text": helpMessage,
          "actions": [
            {
              "type": "message",
              "label": "Yes",
              "text": "See you again!"
            },
            {
              "type": "message",
              "label": "No",
              "text": "Oops...",
            }
          ],
        },
      }]
    };
  }
}
