const {
  createResolver
} = require('apollo-resolvers')
const { Op } = require('sequelize')
const {
  Entry
} = require('../../../db')

const DaySummariesQ = createResolver(
  async (root, query, ctx) => {
    const {
      dateFrom,
      dateTo
    } = query
    const {
      user
    } = ctx

    const where = {
      UserId: user.id,
      date: {
        [Op.gte]: dateFrom,
        [Op.lte]: dateTo
      }
    }

    // TODO:
    // some sort of limit

    const $entries = await Entry.findAll(Entry.withIncludes(
      { where },
      {
        tags: false,
        user: false
      }
    ))

    const daySummariesById = {}

    $entries.forEach(({ Project, date, duration }) => {
      const {
        id: projectSummaryId,
        projectName
      } = Project

      // get daySummary
      const daySummaryId = date.getTime()
      if (!daySummariesById[daySummaryId]) {
        daySummariesById[daySummaryId] = {
          id: daySummaryId.toString(),
          date,
          projectSummariesById: {},
          dayDuration: 0
        }
      }
      const daySummary = daySummariesById[daySummaryId]

      // get projectSummary
      if (!daySummary.projectSummariesById[projectSummaryId]) {
        daySummary.projectSummariesById[projectSummaryId] = {
          id: `${daySummaryId}-${projectSummaryId}`,
          projectName,
          projectDuration: 0
        }
      }
      const projectSummary = daySummary.projectSummariesById[projectSummaryId]

      projectSummary.projectDuration += duration
      daySummary.dayDuration += duration
    })

    const days = []
    for (
      let day = dateFrom.getTime();
      day <= dateTo.getTime();
      day += 24 * 60 * 60 * 1000
    )
      days.push(day)

    days.forEach((day) => {
      if (daySummariesById[day])
        return
      daySummariesById[day] = {
        id: day,
        date: day,
        projectSummariesById: {},
        dayDuration: 0
      }
    })

    const daySummaries = Object.values(daySummariesById)
    daySummaries.forEach((dS) => {
      dS.projectSummaries = Object.values(dS.projectSummariesById)
    })

    const maxDayDuration = Math.max(
      ...Object.values(daySummaries).map(({ dayDuration }) => dayDuration)
    )

    daySummaries.forEach((dS) => {
      let portionConsumed = 0
      dS.projectSummaries.forEach((p, idx) => {
        if (
          dS.dayDuration === maxDayDuration &&
          idx === dS.projectSummaries.length - 1
        ) {
          p.portion = 100 - portionConsumed
          return
        }
        p.portion = Math.round((p.projectDuration / maxDayDuration) * 10000) / 100
        portionConsumed += p.portion
      })
    })

    return {
      daySummaries,
      maxDayDuration
    }
  }
)

module.exports = {
  Query: {
    DaySummariesQ
  }
}
