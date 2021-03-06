import { SpreadsheetDearestRepository } from '../../spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository';
import { SpreadsheetNotificationPeriodRepository } from '../../spreadsheet_infrastructure/notification_periods/spreadsheet_notification_period_repository';
import { DearestPushPresenter } from '../../webhook_app/dearest/presenter/dearest_push_presenter';
import { DearestPushInteractor } from '../../domain/application/dearest/dearest_push_interactor';
import { DearestPushController } from '../../webhook_app/dearest/controller/push/dearest_push_controller';

function pushMessages(): void {
  const dr = new SpreadsheetDearestRepository();
  const npr = new SpreadsheetNotificationPeriodRepository();
  const dpp = new DearestPushPresenter();
  const dpi = new DearestPushInteractor(dr, npr, dpp);
  const dearestPushController = new DearestPushController(dpi);
  dearestPushController.pushMessages();
};
