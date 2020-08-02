import { BirthdayMigrateController } from "../../batch/birthday_migrate_controller";
import { BirthdayMigrateInteractor } from "../../domain/application/batch/birthday_migrate_interactor";
import { SpreadsheetDearestRepository } from "../../spreadsheet_infrastructure/dearests/spreadsheet_dearest_repository";
import { GoogleCalenderApiClient } from "../../external_api/client/google_calender_api_client";

function migrateBirthday(): void {
  const calenderClient = new GoogleCalenderApiClient();
  const events = calenderClient.mapAnnualEvents();

  const dr = new SpreadsheetDearestRepository();
  const bmi = new BirthdayMigrateInteractor(dr);
  const bmc = new BirthdayMigrateController(bmi);
  bmc.migrate(events);
}
