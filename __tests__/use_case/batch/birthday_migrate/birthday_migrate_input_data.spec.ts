import { BirthdayMigrateInputData } from "../../../../src/use_case/batch/birthday_migrate/birthday_migrate_input_data";

describe('BirthdayMigrateInputData', () => {
  const dearestCreateInputData = new BirthdayMigrateInputData();

  describe('#getBirthdayData', () => {
    it('filters only birthday events', () => {
      const events = [
        {title: 'Izuku Midoriyaの誕生日', month: 7, day: 15 },
        {title: 'Katsuki Bakugo とバトル', month: 7, day: 15 },
        {title: 'Ochako Uraraka とデート', month: 8, day: 2 },
        {title: 'Shoto Todorokiの誕生日', month: 1, day: 11 }
        {title: 'All Might     の誕生日', month: 6, day: 10 }
      ]
      const birthdayData = dearestCreateInputData.getBirthdayData(events);
      expect(birthdayData).toStrictEqual([
        { name: 'Izuku Midoriya', birthday: '7/15' },
        { name: 'Shoto Todoroki', birthday: '1/11' },
        { name: 'All Might', birthday: '6/10' },
      ]);
    });
  });
});
