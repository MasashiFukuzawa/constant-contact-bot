import { Subscriber } from "../../view/subscriber";
import { Subscribers } from "../../../constant/subscribers";

export class DearestPushViewModel {
  private readonly subscribers: Subscriber[] = Subscribers.SUBSCRIBERS;

  pushMessages(names: string[]): void {
    this.subscribers.forEach((s) => s.pushMessages(names));
  }
}
