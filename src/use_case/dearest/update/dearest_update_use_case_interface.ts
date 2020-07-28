export interface DearestUpdateUseCaseInterface {
  handle(name: string, typeId: number | null, notificationPeriodId: number | null): void;
}
