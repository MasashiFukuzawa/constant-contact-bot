import { BirthdayMigrateUseCaseInterface } from "../use_case/batch/birthday_migrate/birthday_migrate_use_case_interface";
import { BirthdayMigrateInputData } from "../use_case/batch/birthday_migrate/birthday_migrate_input_data";

export class BirthdayMigrateController {
  constructor(private readonly birthdayMigrateUseCase: BirthdayMigrateUseCaseInterface) {}

  migrate(events: { title: string, month: number, day: number }[]): void {
    const inputData = new BirthdayMigrateInputData().getBirthdayData(events);
    this.birthdayMigrateUseCase.handle(inputData);
  }
}
