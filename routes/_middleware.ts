import { FreshContext } from "$fresh/server.ts";

export async function handler(
  _: Request,
  ctx: FreshContext<unknown>,
) {
  const resp = await ctx.next();
  resp.headers.set("Content-Language", "fr-FR");
  return resp;
}
