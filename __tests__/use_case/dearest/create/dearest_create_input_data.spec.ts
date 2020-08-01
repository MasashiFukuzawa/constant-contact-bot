import { DearestCreateInputData } from "../../../../src/use_case/dearest/create/dearest_create_input_data";

describe('DearestCreateInputData', () => {
  Moment.moment = jest.fn(() => ({
    toDate: jest.fn(() => new Date(2020, 8, 1))
  }));

  const dearestCreateInputData = new DearestCreateInputData();

  describe('#parseTextFromMessage', () => {
    it('parses input text correctly', () => {
      const result = dearestCreateInputData.parseTextFromMessage('create -d n:Midoriya t:1 p:3 l:2020/8/1');
      expect(result).toStrictEqual({
        name: 'Midoriya',
        typeId: 1,
        notificationPeriodId: 3,
        lastContactedDate: new Date(2020, 8, 1)
      });
    });
  });
});
