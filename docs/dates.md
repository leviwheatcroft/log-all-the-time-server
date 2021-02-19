dates are complicated!

I think the basic solution is to disregard the time portion of a date in all circumstances.
If you new Date('01/01/01') the actual date will be 2000-12-31T16:00:00.000Z because my server thinks the timezone is -8 (not sure why it's not plus 8 but anyway)

Point is you can't trust new Date() to make a safe date.

Generally you can just ignore this issue because users don't change timezones very much, so you just allow dates to be set to timezones and no one ever notices.

The problem arises when you want to search for a range of dates. Say new Date('02/18/21') gets converted to GMT +8.

I think basically the workaround is:
 - ensure that entries date field in the db is always recorded in the same time zone with no minutes or seconds, so basically ensure that dates are created from "just the date, not the time"
 - ensure that queries are always sent with no minutes or seconds.

for example the following is fine even though both dates will be the same:

```
const dateFrom = new Date()
dateFrom.setHours(0, 0, 0, 0)

const dateTo = new Date()
dateTo.setHours(0, 0, 0, 0)

query({
  dateFrom,
  dateTo
})

```
