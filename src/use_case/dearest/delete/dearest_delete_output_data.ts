import { Dearest } from "../../../domain/domain/dearest/dearest";

export class DearestDeleteOutputData {
  getMessage(dearest: Dearest): string {
    return `${dearest.getName().toString()} さんの情報を削除しました。
Dearest {
  id: ${dearest.getId().toNumber()},
  name: ${dearest.getName().toString()},
  typeId: ${dearest.getTypeId().toNumber()},
  notificationPeriodId: ${dearest.getNotificationPeriodId().toNumber()},
  lastContactedDate: ${Moment.moment(dearest.getLastContactedDate().toDate()).format('YYYY/MM/DD')},
  birthday: ${!!dearest.getBirthday() ? dearest.getBirthday().toString() : 'null'}
}`;
  }

  getErrorMessage(name: string): string {
    if (name) {
      return `${name} という名前で登録されているDearestは存在しませんでした`;
    } else {
      return '入力された値が null でした';
    }
  }
}
