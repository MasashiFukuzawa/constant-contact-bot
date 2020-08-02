import { BirthdayMigrateUseCaseInterface } from "../../../use_case/batch/birthday_migrate/birthday_migrate_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";

export class BirthdayMigrateInteractor implements BirthdayMigrateUseCaseInterface {
  constructor(private readonly dearestRepository: DearestRepositoryInterface) {}

  handle(inputData: { name: string, birthday: string }[]): void {
    const fullData = this.dearestRepository.getAll();
    fullData.forEach(dearest => {
      if (!dearest.getBirthday()) return;
      inputData.forEach(e => {
        if (dearest.getName().toString() === e.name) {
          const updatedDearest = this.dearestRepository.update(dearest, null, null, e.birthday, false);
          console.log(updatedDearest);
        }
      });
    });
  }
}