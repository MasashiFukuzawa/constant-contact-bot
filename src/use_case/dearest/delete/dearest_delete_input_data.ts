export class DearestDeleteInputData {
  parseTextFromMessage(text: string): string {
    // text => delete {name}
    const contents = text.split(' ');
    return !!contents[1] ? contents[1] : null;
  }
}
