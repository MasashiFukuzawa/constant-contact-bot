import { Dearest } from "../../../domain/domain/dearest/dearest";

export class DearestCreateOutputData {
  getMessage(dearest: Dearest): string {
    return `${dearest.getName().toString()} さんの情報を登録しました。
Dearest {
  id: ${dearest.getId().toNumber()},
  name: ${dearest.getName().toString()},
  typeId: ${dearest.getTypeId().toNumber()},
  notificationPeriodId: ${dearest.getNotificationPeriodId().toNumber()},
  lastContactedDate: ${dearest.getLastContactedDate().toDate().toLocaleString()}
}`;
  }

  getErrorMessage(errorMessage: string, name: string): string {
    if (errorMessage) {
      return `Validation ${errorMessage}`;
    } else {
      return `Unique制約に引っ掛かりました。${name} さんは既に登録されています。`;
    }
  }
}
