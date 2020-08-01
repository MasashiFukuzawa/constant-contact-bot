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

  getErrorMessage(): string {
    return 'バリデーションエラー: Not Null制約 または Unique制約 に引っ掛かりました';
  }
}
