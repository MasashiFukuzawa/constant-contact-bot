export class BirthdayMigrateInputData {
  getBirthdayData(events: { title: string, month: number, day: number }[]): { name: string, birthday: string }[] {
    const birthdayEvents = events.filter(e => e.title.indexOf('の誕生日') !== -1);
    return birthdayEvents.map(e => {
      return {
        name: e.title.slice(0, -4).replace(/ +$/g, ''),
        birthday: `${e.month}/${e.day}`
      };
    });
  }
}
