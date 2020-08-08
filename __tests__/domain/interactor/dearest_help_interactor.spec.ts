import { DearestHelpInteractor } from "../../../src/domain/application/dearest/dearest_help_interactor";
import { DearestReplyPresenter } from "../../../src/webhook_app/dearest/presenter/dearest_reply_presenter";

describe('DearestHelpInteractor', () => {
  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'xxxxxxx')
  })) as any;
  UrlFetchApp.fetch = jest.fn();

  describe('SpreadsheetInfrastructure', () => {
    describe('#handle', () => {
      it('sends a help message successfully', () => {
        const dpp = new DearestReplyPresenter();
        const das = new DearestHelpInteractor(dpp);
        const replyToken = 'some_reply_token';
        das.handle(replyToken);
        expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1);
      });
    });
  });
});
