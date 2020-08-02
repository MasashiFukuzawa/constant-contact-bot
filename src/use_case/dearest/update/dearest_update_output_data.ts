import { Dearest } from "../../../domain/domain/dearest/dearest";

export class DearestUpdateOutputData {
  getMessage(dearest: Dearest): string {
    return `${dearest.getName().toString()} の情報を更新しました。
Dearest {
  id: ${dearest.getId().toNumber()},
  name: ${dearest.getName().toString()},
  typeId: ${dearest.getTypeId().toNumber()},
  notificationPeriodId: ${dearest.getNotificationPeriodId().toNumber()},
  lastContactedDate: ${Moment.moment(dearest.getLastContactedDate().toDate()).format('YYYY/MM/DD')},
  birthday: ${!!dearest.getBirthday().toString() ? dearest.getBirthday().toString() : 'null'}
}`;
  }

  getErrorMessage(name: string): string {
    return `${name} という名前で登録されているDearestは存在しませんでした`;
  }
}
