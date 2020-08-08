import { DearestDeleteUseCaseInterface } from '../../../use_case/dearest/delete/dearest_delete_use_case_interface';
import { DearestDeleteInputData } from "../../../use_case/dearest/delete/dearest_delete_input_data";

export class DearestDeleteController {
  constructor(private readonly dearestDeleteUseCase: DearestDeleteUseCaseInterface) {}

  delete(replyToken: string, text: string): void {
    const inputData = new DearestDeleteInputData();
    const name = inputData.parseTextFromMessage(text);
    this.dearestDeleteUseCase.handle(replyToken, name);
  }
}
