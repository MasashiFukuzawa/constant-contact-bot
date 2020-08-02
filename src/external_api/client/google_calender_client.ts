import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;

export class GoogleCalenderClient {
  mapAnnualEvents(): { title: string, month: number, day: number }[] {
    const events = this.getAnnualEvents();
    return events.map(e => {
      const title = e.getTitle();
      // NOTE: getStartTimeメソッドはカレンダーに設定されたタイムゾーンを基準に日付が取得されるため、
      // GASとカレンダーでタイムゾーン設定が同じでないと日付がずれる点に注意が必要
      const date = e.getStartTime();
      const month = date.getMonth();
      const day = date.getDay();
      return { title, month, day };
    });
  }

  private getAnnualEvents(): CalendarEvent[] {
    const calendar = CalendarApp.getCalendarById(
      PropertiesService.getScriptProperties().getProperty("CALENDAR_ID")
    );
    const nowForStart = Moment.moment();
    const nowForEnd = Moment.moment();
    const startTime: Date = nowForStart.subtract(6, 'months').toDate();
    const endTime: Date = nowForEnd.add(6, 'months').toDate();
    return calendar.getEvents(startTime, endTime);
  }
}
