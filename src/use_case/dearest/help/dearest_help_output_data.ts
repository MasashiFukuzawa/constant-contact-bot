export class DearestHelpOutputData {
  getMessage(): string {
    return `1) create -d n:{name} t:{type_id} p:{notification_period_id}

2) update -d n:{name} t:{type_id} p:{notification_period_id}

3) delete -d n:{name}

4) help`;
  }
}
