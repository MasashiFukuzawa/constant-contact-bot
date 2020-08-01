import { Dearest } from "../../../domain/domain/dearest/dearest";

export class DearestUpdateOutputData {
  getMessage(dearest: Dearest): string {
    return `${dearest.getName().toString()} さんの情報を更新しました。
Dearest {
  id: ${dearest.getId().toNumber()},
  name: ${dearest.getName().toString()},
  typeId: ${dearest.getTypeId().toNumber()},
  notificationPeriodId: ${dearest.getNotificationPeriodId().toNumber()},
  lastContactedDate: ${dearest.getLastContactedDate().toDate().toLocaleString()}
}`;
  }

  getErrorMessage(name: string): string {
    return `${name} という名前で登録されているDearestは存在しませんでした`;
  }
}
