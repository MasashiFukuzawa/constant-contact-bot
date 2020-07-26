import { Subscriber } from "../webhook_app/view/subscriber";
import { LineView } from "../webhook_app/view/line_view";

export class Subscribers {
  static SUBSCRIBERS: Subscriber[] = [new LineView()];
}
