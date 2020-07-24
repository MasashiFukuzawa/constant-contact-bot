import { DearestApplicationServiceInterface } from '../../interface/dearest/dearestApplicationServiceInterface';
import { DearestRepositoryInterface } from '../../interface/dearest/deareastRepositoryInterface';

export class DearestApplicationService implements DearestApplicationServiceInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
  ) {}

  getNames(): string[] {
    const names = this.dearestRepository.getNames().map((e) => e[0]).filter((e) => !!e);
    return names;
  }
}
