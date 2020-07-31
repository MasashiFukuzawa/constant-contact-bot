import { DearestUpdateInputData } from "../../../../src/use_case/dearest/update/dearest_update_input_data";

describe('DearestUpdateInputData', () => {
  const dearestUpdateInputData = new DearestUpdateInputData();

  describe('#parseTextFromMessage', () => {
    it('parses input text correctly', () => {
      const result = dearestUpdateInputData.parseTextFromMessage('update -d n:Midoriya t:1 p:3');
      expect(result).toStrictEqual({ name: 'Midoriya', typeId: 1, notificationPeriodId: 3 });
    });
  });

  describe('#parseDataFromPostBack', () => {
    it('parses input data correctly', () => {
      const result = dearestUpdateInputData.parseDataFromPostBack('name=Midoriya');
      expect(result).toStrictEqual({ name: 'Midoriya', typeId: null, notificationPeriodId: null });
    });
  });
});
