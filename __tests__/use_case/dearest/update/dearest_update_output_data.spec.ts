import { DearestUpdateOutputData } from "../../../../src/use_case/dearest/update/dearest_update_output_data";
import { Dearest } from "../../../../src/domain/domain/dearest/dearest";

describe('DearestUpdateOutputData', () => {
  Moment.moment = jest.fn(() => ({
    format: jest.fn(() => '2020/8/1')
  }));

  const dearestUpdateOutputData = new DearestUpdateOutputData();

  describe('#getMessage', () => {
    it('returns output text correctly', () => {
      const dearest = new Dearest(1, 'Midoriya Izuku', 1, 3, new Date(2020, 8, 1, 1, 18, 0), null);
      const result = dearestUpdateOutputData.getMessage(dearest);
      expect(result).toBe(`Midoriya Izuku の情報を更新しました。
Dearest {
  id: 1,
  name: Midoriya Izuku,
  typeId: 1,
  notificationPeriodId: 3,
  lastContactedDate: 2020/8/1,
  birthday: null
}`
    )});
  });

  describe('#getErrorMessage', () => {
    it('returns output data correctly', () => {
      const validationErrorMessage = 'DearestTypeIdが存在しません';
      const existenceErrorMessage = 'All Might という名前で登録されているDearestは存在しません';
      const result = dearestUpdateOutputData.getErrorMessage(validationErrorMessage, existenceErrorMessage);
      expect(result).toBe('DearestTypeIdが存在しません, All Might という名前で登録されているDearestは存在しません');
    });

    it('returns output data correctly', () => {
      const validationErrorMessage = 'DearestNameが存在しません';
      const existenceErrorMessage = null;
      const result = dearestUpdateOutputData.getErrorMessage(validationErrorMessage, existenceErrorMessage);
      expect(result).toBe('DearestNameが存在しません');
    });

    it('returns output data correctly', () => {
      const validationErrorMessage = null;
      const existenceErrorMessage = 'All Might という名前で登録されているDearestは存在しません';
      const result = dearestUpdateOutputData.getErrorMessage(validationErrorMessage, existenceErrorMessage);
      expect(result).toBe('All Might という名前で登録されているDearestは存在しません');
    });
  });
});
