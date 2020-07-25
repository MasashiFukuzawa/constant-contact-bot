import { DearestPushUseCaseInterface } from '../../use_case/dearest/push/dearest_push_use_case_interface';

export class DearestController {
  constructor(private readonly dearestPushUseCase: DearestPushUseCaseInterface) {}

  pushMessages(): void {
    this.dearestPushUseCase.handle();
  }
}
