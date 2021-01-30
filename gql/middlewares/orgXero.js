import OrgXero from '../../lib/orgXero'
import * as Resolver from '../resolverTypes'
import {
  RANGE_ERROR
} from '@lib/errors'
import { isUndefined } from '@lib/typeGuards'

async function orgXero (
  resolve: Resolver.Resolve,
  root: Resolver.Root,
  args: Resolver.Args,
  ctx: Resolver.Ctx,
  info: Resolver.Info
): Promise<void> {
  const {
    jwt,
    org
  } = ctx
  if (isUndefined(org)) throw new RANGE_ERROR()
  if (isUndefined(jwt)) ctx.orgXero = new OrgXero(org)
  else {
    const organisationId = jwt.grants.organisationId
    const userId = jwt.userId
    ctx.orgXero = new OrgXero(org, organisationId, userId)
  }

  const result = await resolve(root, args, ctx, info)

  return result
}

export const orgXeroMap = {
  Query: orgXero,
  Mutation: orgXero
}