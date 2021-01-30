import { parse } from 'graphql-parse-resolve-info'
import * as Resolver from '@gql/resolverTypes'
import { RANGE_ERROR } from '@lib/errors'
import {
  isNull,
  isVoid
} from '@lib/typeGuards'

async function fieldSelections (
  resolve: Resolver.Resolve,
  root: Resolver.Root,
  args: Resolver.Args,
  ctx: Resolver.Ctx,
  info: Resolver.Info
): Promise<void> {
  function getSelection (
    types: string[],
    field: string
  ): boolean {

    function recurse (
      obj: {
        [x: string]: any
      },
      depth = 0
    ):  string[] | undefined {
      const keys = Object.keys(obj)
      const type = types.find((t) => keys.includes(t))
      if (type) {
        // dbg(`${' -'.repeat(depth)} [${type}]`)
        return Object.keys(obj[type])
      }
      let result
      // eslint-disable-next-line array-callback-return
      keys.some((k) => {
        // dbg(`${' -'.repeat(depth)} ${k}`)
        if (obj[k].fieldsByTypeName) {
          result = recurse(obj[k].fieldsByTypeName, depth + 1)
        } else {
          result = recurse(obj[k], depth + 1)
        }
        return result
      })
      return result
    }
    // if (isNull(info)) throw new RANGE_ERROR()
    const parsed = parse(info)
    if (
      (isNull(parsed)) ||
      (isVoid(parsed))
    ) throw new RANGE_ERROR()
    const fieldsByTypeName = parsed.fieldsByTypeName
    const fields = recurse(fieldsByTypeName)
    if (fields) return fields.includes(field)
    return false
  }

  ctx.getSelection = getSelection

  const result = await resolve(root, args, ctx, info)

  return result
}

export const fieldSelectionsMap = { Query: fieldSelections }
