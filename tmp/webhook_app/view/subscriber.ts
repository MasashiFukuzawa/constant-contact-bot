export abstract class Subscriber {
  abstract pushMessages(names: string[]): void;
}