import { DearestRepository } from '../../../src/repository/dearestRepository';
import { DearestApplicationService } from '../../../src/application/service/dearestApplicationService';

describe('DearestApplicationService', () => {
  it('returns all registered names', () => {
    const dr = new DearestRepository();
    const das = new DearestApplicationService(dr);
    jest.spyOn(DearestRepository.prototype, 'getNames')
      .mockReturnValueOnce([
        ['Izuku Midoriya'],
        ['Katsuki Bakugo'],
        ['Ochako Uraraka'],
        ['Shoto Todoroki'],
      ]);
    const names = das.getNames();
    expect(names[0]).toBe('Izuku Midoriya');
    expect(names[1]).toBe('Katsuki Bakugo');
    expect(names[2]).toBe('Ochako Uraraka');
    expect(names[3]).toBe('Shoto Todoroki');
  });
});
