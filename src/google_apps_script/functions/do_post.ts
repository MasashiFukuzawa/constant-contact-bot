import { SpreadsheetDearestRepository } from "../../spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { SpreadsheetNotificationPeriodRepository } from "../../spreadsheet_infrastructure/notification_periods/spreadsheet_notification_period_repository";
import { SpreadsheetTypeRepository } from "../../spreadsheet_infrastructure/types/spreadsheet_type_repository";
import { DearestHelpController } from "../../webhook_app/dearest/help/dearest_help_controller";
import { DearestHelpPresenter } from "../../webhook_app/dearest/help/dearest_help_presenter";
import { DearestHelpInteractor } from "../../domain/application/dearest/dearest_help_interactor";
import { DearestUpdateController } from "../../webhook_app/dearest/update/dearest_update_controller";
import { DearestUpdatePresenter } from "../../webhook_app/dearest/update/dearest_update_presenter";
import { DearestUpdateInteractor } from "../../domain/application/dearest/dearest_update_interactor";

function doPost(e: any): void {
  const json = JSON.parse(e.postData.contents);
  const events = json.events;

  events.forEach(e => {
    const eventType: string = e.type;
    const replyToken: string = e.replyToken;
    switch (eventType) {
      case 'message':
        const text: string = e.message.text;
        execControllerAction(replyToken, eventType, text);
      case 'postback':
        const data: string = e.postback.data;
        execDearestUpdateAction(replyToken, eventType, data);
    }
  });
}

function execControllerAction(replyToken: string, eventType: string, text: string): void {
  if (text === 'help') {
    return execDearestHelpAction(replyToken);
  } else if (text.indexOf('create -d') !== -1) {
    return; // TODO
  } else if (text.indexOf('update -d') !== -1) {
    return execDearestUpdateAction(replyToken, eventType, text);
  } else if (text.indexOf('delete -d') !== -1) {
    return; // TODO
  }
}

function execDearestHelpAction(replyToken: string): void {
  const dhp = new DearestHelpPresenter();
  const dhi = new DearestHelpInteractor(dhp);
  const dearestHelpController = new DearestHelpController(dhi);
  dearestHelpController.help(replyToken);
}

function execDearestUpdateAction(replyToken: string, eventType: string, str: string): void {
  const dr = initDearestRepository();
  const dup = new DearestUpdatePresenter();
  const dui = new DearestUpdateInteractor(dr, dup);
  const dearestUpdateController = new DearestUpdateController(dui);
  dearestUpdateController.update(replyToken, eventType, str);
}

function initDearestRepository(): SpreadsheetDearestRepository {
  return new SpreadsheetDearestRepository();
}

function initTypeRepository(): SpreadsheetTypeRepository {
  return new SpreadsheetTypeRepository();
}

function initNotificationPeriodRepository(): SpreadsheetNotificationPeriodRepository {
  return new SpreadsheetNotificationPeriodRepository();
}
