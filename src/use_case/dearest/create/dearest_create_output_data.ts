import { Dearest } from "../../../domain/domain/dearest/dearest";

export class DearestCreateOutputData {
  getMessage(dearest: Dearest): string {
    return `${dearest.getName().toString()} の情報を登録しました
Dearest {
  id: ${dearest.getId().toNumber()},
  name: ${dearest.getName().toString()},
  typeId: ${dearest.getTypeId().toNumber()},
  notificationPeriodId: ${dearest.getNotificationPeriodId().toNumber()},
  lastContactedDate: ${Moment.moment(dearest.getLastContactedDate().toDate()).format('YYYY/MM/DD')},
  birthday: ${!!dearest.getBirthday().toString() ? dearest.getBirthday().toString() : 'null'}
}`;
  }

  getErrorMessage(validationErrorMessage: string | null, uniquenessErrorMessage: string | null): string {
    return [validationErrorMessage, uniquenessErrorMessage].filter(e => !!e).join(', ');
  }
}
