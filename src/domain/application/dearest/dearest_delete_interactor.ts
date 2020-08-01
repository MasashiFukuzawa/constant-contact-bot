import { DearestDeleteUseCaseInterface } from "../../../use_case/dearest/delete/dearest_delete_use_case_interface";
import { DearestRepositoryInterface } from "../../domain/dearest/dearest_repository_interface";
import { DearestDeletePresenterInterface } from "../../../use_case/dearest/delete/dearest_delete_presenter_interface";
import { DearestDeleteOutputData } from "../../../use_case/dearest/delete/dearest_delete_output_data";

export class DearestDeleteInteractor implements DearestDeleteUseCaseInterface {
  constructor(
    private readonly dearestRepository: DearestRepositoryInterface,
    private readonly dearestDeletePresenter: DearestDeletePresenterInterface
  ) {}

  handle(replyToken: string, name: string): void {
    const existsName = !!this.dearestRepository.findByName(name);
    const dearestDeleteOutputData = new DearestDeleteOutputData();
    let outputData: string = null;
    if (existsName) {
      const dearest = this.dearestRepository.delete(name);
      outputData = dearestDeleteOutputData.getMessage(dearest);
    } else {
      outputData = dearestDeleteOutputData.getErrorMessage(name);
    }
    this.dearestDeletePresenter.replyMessage(replyToken, outputData);
  }
}
