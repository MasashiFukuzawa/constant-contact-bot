import { Dearest } from "./dearest";

export interface DearestRepositoryInterface {
  findByName(name: string): Dearest | null;
  update(dearest: Dearest, typeId?: number, notificationPeriodId?: number): Dearest;
}
