export class DearestPushOutputData {
  getBirthdayMessage(name: string): string {
    return `今日は ${name} の誕生日です！\n親愛なる ${name} にお祝いのメッセージを送りましょう！`
  }

  getDefaultMessage(name: string, term: number, unit: string): string {
    const period = `${term}${unit}`;
    return `${this.translatedPeriod(period)}ぶりに ${name} と連絡を取ってみませんか？`;
  }

  private translatedPeriod(period: string): string {
    switch (period) {
      case '1week':
        return '1週間';
      case '3months':
        return '3ヶ月';
      case '6months':
        return '半年';
      case '1year':
        return '1年';
    }
  }
}
