export class BirthdayMigrateInputData {
  getBirthdayData(events: { title: string, month: number, day: number }[]): { name: string, birthday: string }[] {
    const birthdayEvents = events.filter(e => e.title.indexOf('誕生日') !== -1);
    return birthdayEvents.map(e => {
      return {
        name: e.title.replace(/誕生日|の誕生日/, '').replace(/ +$/, ''),
        birthday: `${e.month}/${e.day}`
      };
    });
  }
}
