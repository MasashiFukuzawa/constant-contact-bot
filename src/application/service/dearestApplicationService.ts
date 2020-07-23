import { DearestApplicationServiceInterface } from '../../interface/dearest/dearestApplicationServiceInterface';
import { DearestRepositoryInterface } from '../../interface/dearest/deareastRepositoryInterface';

export class DearestApplicationService implements DearestApplicationServiceInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
  ) {}

  getNames(): string[][] {
    return this.dearestRepository.getNames();
  }
}
