export class DearestDeleteInputData {
  parseTextFromMessage(text: string): string {
    // text => delete -d n:{name}
    const contents = text.split(' ');
    const argName = contents.filter(RegExp.prototype.test, /^n:.+/g)[0];
    return argName ? argName.slice(2) : null;
  }
}
