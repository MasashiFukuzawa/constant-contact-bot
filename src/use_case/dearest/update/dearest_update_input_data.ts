export interface UpdateInputData {
  name: string;
  typeId: number | null;
  notificationPeriodId: number | null;
  birthday: string | null;
}

export class DearestUpdateInputData {
  parseTextFromMessage(text: string): UpdateInputData {
    // text => update {name} {type_id} {notification_period_id} {birthday}
    const contents = text.split(' ');
    const name = !!contents[1] ? contents[1] : null;
    const typeId = !!contents[2] ? Number(contents[2]) : null;
    const notificationPeriodId = !!contents[3] ? Number(contents[3]) : null;
    const birthday = contents[4] ? contents[4] : null;
    return { name, typeId, notificationPeriodId, birthday };
  }

  parseDataFromPostBack(data: string): UpdateInputData {
    // data => name={name}
    return {
      name: data.split('=')[1],
      typeId: null,
      notificationPeriodId: null,
      birthday: null
    };
  }
}
