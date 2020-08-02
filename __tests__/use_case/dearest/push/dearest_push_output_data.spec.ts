import { DearestPushOutputData } from "../../../../src/use_case/dearest/push/dearest_push_output_data";

describe('DearestPushOutputData', () => {
  describe('#getDefaultMessage', () => {
    it('returns correct message', () => {
      const name = 'Izuku Midoriya';
      const term = 6;
      const unit = 'months';
      const dearestPushOutputData = new DearestPushOutputData();
      const message = dearestPushOutputData.getDefaultMessage(name, term, unit);
      expect(message).toBe('半年ぶりに Izuku Midoriya と連絡を取ってみませんか？');
    });
  });
});
