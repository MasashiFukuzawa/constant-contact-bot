import { DearestUpdateOutputData } from "../../../../src/use_case/dearest/update/dearest_update_output_data";
import { Dearest } from "../../../../src/domain/domain/dearest/dearest";

describe('DearestUpdateOutputData', () => {
  const dearestUpdateOutputData = new DearestUpdateOutputData();

  describe('#getMessage', () => {
    it('returns output text correctly', () => {
      const dearest = new Dearest(1, 'Midoriya Izuku', 1, 3, new Date(2020, 8, 1, 1, 18, 0));
      const result = dearestUpdateOutputData.getMessage(dearest);
      expect(result).toBe(`Midoriya Izuku さんの情報を更新しました。
Dearest {
  id: 1,
  name: Midoriya Izuku,
  typeId: 1,
  notificationPeriodId: 3,
  lastContactedDate: 2020/9/1 1:18:00
}`
    )});
  });

  describe('#getErrorMessage', () => {
    it('returns output data correctly', () => {
      const result = dearestUpdateOutputData.getErrorMessage('All Might');
      expect(result).toBe('All Might という名前で登録されているDearestは存在しませんでした');
    });
  });
});
