import { SpreadsheetDearestRepository } from "../../spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { DearestHelpController } from "../../webhook_app/dearest/help/dearest_help_controller";
import { DearestHelpPresenter } from "../../webhook_app/dearest/help/dearest_help_presenter";
import { DearestHelpInteractor } from "../../domain/application/dearest/dearest_help_interactor";
import { DearestUpdateController } from "../../webhook_app/dearest/update/dearest_update_controller";
import { DearestUpdatePresenter } from "../../webhook_app/dearest/update/dearest_update_presenter";
import { DearestUpdateInteractor } from "../../domain/application/dearest/dearest_update_interactor";
import { DearestCreatePresenter } from "../../webhook_app/dearest/create/dearest_create_presenter";
import { DearestCreateInteractor } from "../../domain/application/dearest/dearest_create_interactor";
import { DearestCreateController } from "../../webhook_app/dearest/create/dearest_create_controller";
import { DearestDeletePresenter } from "../../webhook_app/dearest/delete/dearest_delete_presenter";
import { DearestDeleteInteractor } from "../../domain/application/dearest/dearest_delete_interactor";
import { DearestDeleteController } from "../../webhook_app/dearest/delete/dearest_delete_controller";

function doPost(e: any): void {
  const json = JSON.parse(e.postData.contents);
  const events = json.events;

  events.forEach(e => {
    const eventType: string = e.type;
    const replyToken: string = e.replyToken;
    const doPost = new DoPost();
    switch (eventType) {
      case 'message':
        const text: string = e.message.text;
        doPost.execControllerAction(replyToken, eventType, text);
      case 'postback':
        const data: string = e.postback.data;
        doPost.execDearestUpdateAction(replyToken, eventType, data);
    }
  });
}

class DoPost {
  execControllerAction(replyToken: string, eventType: string, text: string): void {
    if (text === 'help') {
      return this.execDearestHelpAction(replyToken);
    } else if (text.indexOf('create -d') !== -1) {
      return this.execDearestCreateAction(replyToken, text);
    } else if (text.indexOf('update -d') !== -1) {
      return this.execDearestUpdateAction(replyToken, eventType, text);
    } else if (text.indexOf('delete -d') !== -1) {
      return this.execDearestDeleteAction(replyToken, text);
    }
  }

  execDearestUpdateAction(replyToken: string, eventType: string, str: string): void {
    const dr = this.initDearestRepository();
    const dup = new DearestUpdatePresenter();
    const dui = new DearestUpdateInteractor(dr, dup);
    const dearestUpdateController = new DearestUpdateController(dui);
    dearestUpdateController.update(replyToken, eventType, str);
  }

  private execDearestHelpAction(replyToken: string): void {
    const dhp = new DearestHelpPresenter();
    const dhi = new DearestHelpInteractor(dhp);
    const dearestHelpController = new DearestHelpController(dhi);
    dearestHelpController.help(replyToken);
  }

  private execDearestCreateAction(replyToken: string, text: string): void {
    const dr = this.initDearestRepository();
    const dcp = new DearestCreatePresenter();
    const dci = new DearestCreateInteractor(dr, dcp);
    const dearestCreateController = new DearestCreateController(dci);
    dearestCreateController.create(replyToken, text);
  }

  private execDearestDeleteAction(replyToken: string, str: string): void {
    const dr = this.initDearestRepository();
    const ddp = new DearestDeletePresenter();
    const ddi = new DearestDeleteInteractor(dr, ddp);
    const dearestDeleteController = new DearestDeleteController(ddi);
    dearestDeleteController.delete(replyToken, str);
  }

  private initDearestRepository(): SpreadsheetDearestRepository {
    return new SpreadsheetDearestRepository();
  }
}
