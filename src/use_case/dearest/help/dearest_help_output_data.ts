export class DearestHelpOutputData {
  getMessage(): string {
    return `Here's how to use LINE commands.

1) create

    e.g.) create pitt 1 3 2016/12/24 7/19

    arguments: {
      1st: name,
      2nd: type_id,
      3rd: notification_period_id,
      4th: last_contacted_date,
      5th: birthday (optional)
    }

2) update

    e.g.) update pitt 1 3 2016/12/24 7/19

    arguments: {
      1st: name,
      2nd: type_id (optional),
      3rd: notification_period_id (optional),
      4th: birthday (optional)
    }

3) delete

    e.g.) delete pitt

    argument: name

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
