import { DearestHelpInteractor } from "../../../src/domain/application/dearest/dearest_help_interactor";
import { DearestHelpPresenter } from "../../../src/webhook_app/dearest/help/dearest_help_presenter";

describe('DearestHelpInteractor', () => {
  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'xxxxxxx')
  })) as any;
  UrlFetchApp.fetch = jest.fn();

  describe('SpreadsheetInfrastructure', () => {
    describe('#handle', () => {
      it('sends a help message successfully', () => {
        const dpp = new DearestHelpPresenter();
        const das = new DearestHelpInteractor(dpp);
        das.handle();
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1);
      });
    });
  });
});
