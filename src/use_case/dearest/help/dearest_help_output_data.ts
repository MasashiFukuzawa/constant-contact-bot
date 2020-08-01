export class DearestHelpOutputData {
  getMessage(): string {
    return `1) create -d n:name t:typeId p:notification_period_id l:last_contacted_date

2) update -d n:name t:type_id p:notification_period_id

3) delete -d n:name

4) help`;
  }
}
