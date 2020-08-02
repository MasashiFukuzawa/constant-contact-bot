export class DearestPushOutputData {
  getBirthdayMessage(name: string): string {
    return `今日は ${name} の誕生日です！\n親愛なる ${name} にお祝いのメッセージを送りましょう！`
  }

  getDefaultMessage(name: string, term: number, unit: string): string {
    const period = `${term}${unit}`;
    let translatedPeriod: string;
    switch (period) {
      case '1week':
        translatedPeriod = '1週間';
        break;
      case '3months':
        translatedPeriod = '3ヶ月';
        break;
      case '6months':
        translatedPeriod = '半年';
        break;
      case '1year':
        translatedPeriod = '1年';
          break;
    }
    return `${translatedPeriod}ぶりに ${name} と連絡を取ってみませんか？`;
  }
}
