import { DearestApplicationServiceInterface } from '../../interface/dearest/dearestApplicationServiceInterface';
import { DearestRepositoryInterface } from '../../interface/dearest/deareastRepositoryInterface';

interface dearest {
  id: number;
  name: string;
  type_id: number;
  notification_period_id: number;
  last_contacted_date: Date;
}

export class DearestApplicationService implements DearestApplicationServiceInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
  ) {}

  getNames(): string[] {
    const rawData = this.dearestRepository.getAllDearestsData();
    const allDearestsData = this.convertToHash(rawData);
    const targetData = this.filterDearestData(allDearestsData);
    return targetData.map((d) => d.name);
  }

  private convertToHash(rawData: any[][]): dearest[] {
    return rawData.map((d) => {
      return {
        id: d[0],
        name: d[1],
        type_id: d[2],
        notification_period_id: d[3],
        last_contacted_date: d[4]
      };
    });
  }

  private filterDearestData(allDearestsData: dearest[]): dearest[] {
    const now = Moment.moment();
    return allDearestsData.filter((d) => {
      const notificationPeriod = { term: 3, unit: 'months' }; // TODO
      const targetDate: Date = now.subtract(notificationPeriod.term, notificationPeriod.unit).toDate();
      console.log(`${d.last_contacted_date < targetDate}`)
      return d.last_contacted_date < targetDate;
    })
  }
}
