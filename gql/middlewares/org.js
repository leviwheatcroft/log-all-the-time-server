import Org from '@lib/org'
import * as Resolver from '../resolverTypes'
import { isUndefined } from '@lib/typeGuards'

async function org (
  resolve: Resolver.Resolve,
  root: Resolver.Root,
  args: Resolver.Args,
  ctx: Resolver.Ctx,
  info: Resolver.Info
): Promise<void> {
  const {
    jwt
  } = ctx
  if (isUndefined(jwt)) ctx.org = new Org()
  else {
    const organisationId = jwt.grants.organisationId
    const userId = jwt.userId
    ctx.org = new Org(organisationId, userId)
  }


  const result = await resolve(root, args, ctx, info)

  return result
}

export const orgMap = {
  Query: org,
  Mutation: org
}
