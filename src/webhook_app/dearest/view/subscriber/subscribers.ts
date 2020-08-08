import { DearestLinePushView } from "../dearest_line_push_view";
import { DearestLineReplyView } from "../dearest_line_reply_view";

export class PushSubscriber {
  static readonly subscribers = [new DearestLinePushView()]
}

export class ReplySubscriber {
  static readonly subscribers = [new DearestLineReplyView()]
}
