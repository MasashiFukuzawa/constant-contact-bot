export interface CreateInputData {
  name: string | null;
  typeId: number | null;
  notificationPeriodId: number | null;
  lastContactedDate: Date | null;
}

export class DearestCreateInputData {
  parseTextFromMessage(text: string): CreateInputData {
    // text => create -d n:{name} t:{type_id} p:{notification_period_id} l:{last_contacted_date}
    const contents = text.split(' ');
    const argName = contents.filter(RegExp.prototype.test, /^n:.+/g)[0];
    const argTypeId = contents.filter(RegExp.prototype.test, /^t:.+/g)[0];
    const argNotificationPeriodId = contents.filter(RegExp.prototype.test, /^p:.+/g)[0];
    const argLastContactedDate = contents.filter(RegExp.prototype.test, /^l:.+/g)[0];
    const name = argName ? argName.slice(2) : null;
    const typeId = argTypeId ? Number(argTypeId.slice(2)) : null;
    const notificationPeriodId = argNotificationPeriodId ? Number(argNotificationPeriodId.slice(2)) : null;
    const lastContactedDate = argLastContactedDate ? Moment.moment(argLastContactedDate.slice(2)).toDate() : null;
    return { name, typeId, notificationPeriodId, lastContactedDate };
  }
}
