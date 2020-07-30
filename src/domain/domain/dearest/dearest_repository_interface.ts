import { Dearest } from "./dearest";

export interface DearestRepositoryInterface {
  getAll(): Dearest[];
  findByName(name: string): Dearest | null;
  update(dearest: Dearest, typeId: number | null, notificationPeriodId: number | null): Dearest;
}
