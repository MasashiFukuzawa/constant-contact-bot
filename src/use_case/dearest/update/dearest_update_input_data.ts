export class DearestUpdateInputData {
  parseTextFromMessage(text: string): {name: string, typeId: number | null, notificationPeriodId: number | null} {
    // text => update -d n:{name} t:{type_id} p:{notification_period_id}
    const contents = text.split(' ');
    const argName = contents.filter(RegExp.prototype.test, /^n:.+/g)[0];
    const argTypeId = contents.filter(RegExp.prototype.test, /^t:.+/g)[0];
    const argNotificationPeriodId = contents.filter(RegExp.prototype.test, /^p:.+/g)[0];
    const name = argName.slice(2);
    const typeId = argTypeId ? Number(argTypeId.slice(2)) : null;
    const notificationPeriodId = argNotificationPeriodId ? Number(argNotificationPeriodId.slice(2)) : null;
    return { name, typeId, notificationPeriodId };
  }

  parseDataFromPostBack(data: string): {name: string, typeId: number | null, notificationPeriodId: number | null} {
    // data => name={name}
    return {
      name: data.slice(5),
      typeId: null,
      notificationPeriodId: null
    };
  }
}
