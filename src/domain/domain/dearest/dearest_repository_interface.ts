import { Dearest } from "./dearest";

export interface DearestRepositoryInterface {
  getAll(): Dearest[];
  findByName(name: string): Dearest | null;
  create(
    name: string,
    typeId: number,
    notificationPeriodId: number,
    lastContactedDate: Date,
    birthday: string | null
  ): Dearest;
  update(
    dearest: Dearest,
    typeId: number | null,
    notificationPeriodId: number | null,
    birthday: string | null
  ): Dearest;
  delete(name: string): Dearest | null;
}
