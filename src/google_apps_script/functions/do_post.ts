import { SpreadsheetDearestRepository } from "../../spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { DearestReplyPresenter } from "../../webhook_app/dearest/presenter/dearest_reply_presenter";
import { DearestUpdateInteractor } from "../../domain/application/dearest/dearest_update_interactor";
import { DearestUpdateController } from "../../webhook_app/dearest/controller/update/dearest_update_controller";
import { DearestHelpInteractor } from "../../domain/application/dearest/dearest_help_interactor";
import { DearestHelpController } from "../../webhook_app/dearest/controller/help/dearest_help_controller";
import { DearestCreateInteractor } from "../../domain/application/dearest/dearest_create_interactor";
import { DearestCreateController } from "../../webhook_app/dearest/controller/create/dearest_create_controller";
import { DearestDeleteInteractor } from "../../domain/application/dearest/dearest_delete_interactor";
import { DearestDeleteController } from "../../webhook_app/dearest/controller/delete/dearest_delete_controller";

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
    } else if (text.indexOf('create') !== -1) {
      return this.execDearestCreateAction(replyToken, text);
    } else if (text.indexOf('update') !== -1) {
      return this.execDearestUpdateAction(replyToken, eventType, text);
    } else if (text.indexOf('delete') !== -1) {
      return this.execDearestDeleteAction(replyToken, text);
    }
  }

  execDearestUpdateAction(replyToken: string, eventType: string, str: string): void {
    const dr = new SpreadsheetDearestRepository();
    const drp = new DearestReplyPresenter();
    const dui = new DearestUpdateInteractor(dr, drp);
    const dearestUpdateController = new DearestUpdateController(dui);
    dearestUpdateController.update(replyToken, eventType, str);
  }

  private execDearestHelpAction(replyToken: string): void {
    const drp = new DearestReplyPresenter();
    const dhi = new DearestHelpInteractor(drp);
    const dearestHelpController = new DearestHelpController(dhi);
    dearestHelpController.help(replyToken);
  }

  private execDearestCreateAction(replyToken: string, text: string): void {
    const dr = new SpreadsheetDearestRepository();
    const drp = new DearestReplyPresenter();
    const dci = new DearestCreateInteractor(dr, drp);
    const dearestCreateController = new DearestCreateController(dci);
    dearestCreateController.create(replyToken, text);
  }

  private execDearestDeleteAction(replyToken: string, str: string): void {
    const dr = new SpreadsheetDearestRepository();
    const drp = new DearestReplyPresenter();
    const ddi = new DearestDeleteInteractor(dr, drp);
    const dearestDeleteController = new DearestDeleteController(ddi);
    dearestDeleteController.delete(replyToken, str);
  }
}
