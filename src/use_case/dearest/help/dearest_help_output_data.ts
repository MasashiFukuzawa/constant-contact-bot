export class DearestHelpOutputData {
  getMessage(): string {
    return `1) Create: create -d n:name t:type p:notification_period

2) Update: update -d n:name t:type p:notification_period

3) Delete: delete -d n:name

4) Help: help

Could you understand?
`;
  }
}
