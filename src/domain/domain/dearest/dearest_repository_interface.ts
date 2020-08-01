import { Dearest } from "./dearest";

export interface DearestRepositoryInterface {
  getAll(): Dearest[];
  findByName(name: string): Dearest | null;
  create(name: string, typeId: number, notificationPeriodId: number, lastContactedDate: Date): Dearest;
  update(dearest: Dearest, typeId: number | null, notificationPeriodId: number | null): Dearest;
}
