import { DearestHelpUseCaseInterface } from '../../../use_case/dearest/help/dearest_help_use_case_interface';

export class DearestHelpController {
  constructor(private readonly dearestHelpUseCase: DearestHelpUseCaseInterface) {}

  help(): void {
    this.dearestHelpUseCase.handle();
  }
}
