export class DearestHelpOutputData {
  getMessage(): string {
    return `Here's how to use LINE commands.

1) create -d n:{name} t:{type_id} p:{notification_period_id} l:{last_contacted_date} b:{birthday}

    n:, t:, p:, l: are required. b: is optional.

    e.g.) create -d n:pitt t:1 p:3 l:2016/12/24 b:7/19

2) update -d n:{name} t:{type_id} p:{notification_period_id} b:{birthday}

    n: is required. t:, p:, l:, b: are optional.

    e.g.) update -d n:pitt t:1 p:3 l:2016/12/24 b:7/19

3) delete -d n:{name}

    n: is required.

    e.g.) delete -d n:pitt

4) help

References:

    type_id: {
      1: family,
      2: relative,
      3: lover,
      4: best_friend,
      5: friend
    }

    notification_period_id: {
      1: 1week,
      2: 3months,
      3: 6months,
      4: 1year
    }`;
  }
}
