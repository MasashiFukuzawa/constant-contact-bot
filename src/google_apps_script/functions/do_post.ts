import { SpreadsheetDearestRepository } from "../../spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { SpreadsheetNotificationPeriodRepository } from "../../spreadsheet_infrastructure/notification_periods/spreadsheet_notification_period_repository";
import { SpreadsheetTypeRepository } from "../../spreadsheet_infrastructure/types/spreadsheet_type_repository";
import { DearestHelpController } from "../../webhook_app/dearest/help/dearest_help_controller";
import { DearestHelpPresenter } from "../../webhook_app/dearest/help/dearest_help_presenter";
import { DearestHelpInteractor } from "../../domain/application/dearest/dearest_help_interactor";

function doPost(e: any): void {
  const json = JSON.parse(e.postData.contents);
  const events = json.events;

  events.forEach(e => {
    switch (e.type) {
      case 'message':
        this.execControllerAction(e);
        // doMessageAction(e);
      case 'postback':
        // TODO
    }
  });
}

function execControllerAction(event: any): any {
  const text: string = event.message.text;
  const sdr = new SpreadsheetDearestRepository();
  const str = new SpreadsheetTypeRepository();
  const snpr = new SpreadsheetNotificationPeriodRepository();

  if (text === 'help') {
    this.execDearestHelpAction(sdr, snpr);
    return;
  } else if (text.indexOf('create -d') !== -1) {
    return; // TODO
  } else if (text.indexOf('update -d') !== -1) {
    return; // TODO
  } else if (text.indexOf('delete -d') !== -1) {
    return; // TODO
  } else {
    return;
  }
}

function execDearestHelpAction(): void {
  const dhp = new DearestHelpPresenter();
  const dhi = new DearestHelpInteractor(dhp);
  const dearestHelpController = new DearestHelpController(dhi);
  dearestHelpController.help();
}
