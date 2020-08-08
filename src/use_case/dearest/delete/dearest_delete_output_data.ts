import { Dearest } from "../../../domain/domain/dearest/dearest";

export class DearestDeleteOutputData {
  getMessage(dearest: Dearest): string {
    return `${dearest.getName().toString()} の情報を削除しました
Dearest {
  id: ${dearest.getId().toNumber()},
  name: ${dearest.getName().toString()},
  typeId: ${dearest.getTypeId().toNumber()},
  notificationPeriodId: ${dearest.getNotificationPeriodId().toNumber()},
  lastContactedDate: ${Moment.moment(dearest.getLastContactedDate().toDate()).format('YYYY/MM/DD')},
  birthday: ${!!dearest.getBirthday().toString() ? dearest.getBirthday().toString() : 'null'}
}`;
  }
}
