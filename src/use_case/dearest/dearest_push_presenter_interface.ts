export interface DearestPushPresenterInterface {
  pushMessages(data: { name: string, message: string }[]): void;
}
