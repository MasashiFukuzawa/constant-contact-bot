export interface DearestUpdateUseCaseInterface {
  handle(
    replyToken: string,
    name: string,
    typeId: number | null,
    notificationPeriodId: number | null,
    birthday: string | null
  ): void;
}
