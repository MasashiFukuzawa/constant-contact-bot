export interface DearestCreateUseCaseInterface {
  handle(
    replyToken: string,
    name: string,
    typeId: number,
    notificationPeriodId: number,
    lastContactedDate: Date,
    birthday: string | null
  ): void;
}
