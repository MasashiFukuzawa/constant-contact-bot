export interface DearestUpdateUseCaseInterface {
  handle(name: string, typeId?: number, notificationPeriodId?: number): void;
}
