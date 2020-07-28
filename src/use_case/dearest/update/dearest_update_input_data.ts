export class DearestUpdateInputData {
  getNameFromMessage(text: string): {name: string, typeId: number | null, notificationPeriodId: number | null} {
    // text => update -d n:{name} t:4 p:3
    const contents = text.split(' ');
    const argName = contents.filter(RegExp.prototype.test, /^n:.+/g)[0];
    const argTypeId = contents.filter(RegExp.prototype.test, /^t:.+/g)[0];
    const argNotificationPeriodId = contents.filter(RegExp.prototype.test, /^p:.+/g)[0];
    const name = argName.slice(0, 2);
    const typeId = argTypeId ? +argTypeId.slice(0, 2) : null;
    const notificationPeriodId = argNotificationPeriodId ? +argNotificationPeriodId.slice(0, 2) : null;
    return { name, typeId, notificationPeriodId };
  }

  getNameFromPostBack(data: string): {name: string, typeId: number | null, notificationPeriodId: number | null} {
    // data => name={name}
    return {
      name: data.slice(4),
      typeId: null,
      notificationPeriodId: null
    };
  }
}
