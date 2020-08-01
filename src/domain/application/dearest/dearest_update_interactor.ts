import { DearestUpdateUseCaseInterface } from "../../../use_case/dearest/update/dearest_update_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { DearestUpdatePresenterInterface } from "../../../use_case/dearest/update/dearest_update_presenter_interface";
import { DearestUpdateOutputData } from "../../../use_case/dearest/update/dearest_update_output_data";

export class DearestUpdateInteractor implements DearestUpdateUseCaseInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
    private readonly dearestUpdatePresenter: DearestUpdatePresenterInterface
  ) {}

  handle(
    replyToken: string,
    name: string,
    typeId: number | null,
    notificationPeriodId: number | null,
    birthday: string | null
  ): void {
    const dearest = this.dearestRepository.findByName(name);
    const dearestUpdateOutputData = new DearestUpdateOutputData();
    let outputData: string;
    if (dearest) {
      const updatedDearest = this.dearestRepository.update(dearest, typeId, notificationPeriodId, birthday);
      outputData = dearestUpdateOutputData.getMessage(updatedDearest);
    } else {
      outputData = dearestUpdateOutputData.getErrorMessage(name);
    }
    this.dearestUpdatePresenter.replyMessage(replyToken, outputData);
  }
}
