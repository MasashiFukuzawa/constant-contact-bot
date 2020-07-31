import { DearestUpdateUseCaseInterface } from '../../../use_case/dearest/update/dearest_update_use_case_interface';
import { DearestUpdateInputData } from "../../../use_case/dearest/update/dearest_update_input_data";

export class DearestUpdateController {
  constructor(private readonly dearestUpdateUseCase: DearestUpdateUseCaseInterface) {}

  update(replyToken: string, eventType: string, str: string): void {
    const params = this.getParams(eventType, str);
    this.dearestUpdateUseCase.handle(
      replyToken,
      params.name,
      params.typeId,
      params.notificationPeriodId
    );
  }

  private getParams(
    eventType: string,
    str: string
  ): {name: string, typeId: number | null, notificationPeriodId: number | null} {
    const inputData = new DearestUpdateInputData();
    switch (eventType) {
      case 'message':
        return inputData.parseTextFromMessage(str);
      case 'postback':
        return inputData.parseDataFromPostBack(str);
    }
  }
}
