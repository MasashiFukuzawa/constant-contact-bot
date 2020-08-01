import { DearestCreateUseCaseInterface } from '../../../use_case/dearest/create/dearest_create_use_case_interface';
import { DearestCreateInputData } from "../../../use_case/dearest/create/dearest_create_input_data";

export class DearestCreateController {
  constructor(private readonly dearestCreateUseCase: DearestCreateUseCaseInterface) {}

  create(replyToken: string, text: string): void {
    const inputData = new DearestCreateInputData();
    const params = inputData.parseTextFromMessage(text);
    this.dearestCreateUseCase.handle(
      replyToken,
      params.name,
      params.typeId,
      params.notificationPeriodId,
      params.lastContactedDate,
      params.birthday
    );
  }
}
