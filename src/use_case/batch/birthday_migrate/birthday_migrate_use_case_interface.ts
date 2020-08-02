export interface BirthdayMigrateUseCaseInterface {
  handle(inputData: { name: string, birthday: string }[]): void;
}