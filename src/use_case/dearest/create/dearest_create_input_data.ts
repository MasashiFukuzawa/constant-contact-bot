export interface CreateInputData {
  name: string | null;
  typeId: number | null;
  notificationPeriodId: number | null;
  lastContactedDate: Date | null;
  birthday: string | null;
}

export class DearestCreateInputData {
  parseTextFromMessage(text: string): CreateInputData {
    // text => create {name} {type_id} {notification_period_id} {last_contacted_date} {birthday}
    const contents = text.split(' ');
    const name = !!contents[1] ? contents[1] : null;
    const typeId = !!contents[2] ? Number(contents[2]) : null;
    const notificationPeriodId = !!contents[3] ? Number(contents[3]) : null;
    const lastContactedDate = !!contents[4] ? Moment.moment(contents[4]).toDate() : null;
    const birthday = !!contents[5] ? contents[5] : null;
    return { name, typeId, notificationPeriodId, lastContactedDate, birthday };
  }
}
