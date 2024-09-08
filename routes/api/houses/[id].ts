import { Handlers } from "$fresh/server.ts";

const kv = await Deno.openKv();

export const handler: Handlers<House | null> = {
  async GET(_req, ctx) {
    const key = ['house', ctx.params.id];
    const house = await kv.get<House>(key);
    return new Response(JSON.stringify(house.value));
  },
  async PUT(req, ctx) {
    const id = ctx.params.id;
    const house = (await req.json()) as House;
    const houseKey = ['house', id];
    const houseRes = await kv.get(houseKey);
    if (!houseRes.value) return new Response(`La maison ${id} n'existe pas`);
    const ok = await kv.atomic().check(houseRes).set(houseKey, house).commit();
    if (!ok) throw new Error("La maison n'a pas pu être modifiée");
    return new Response(JSON.stringify(house));
  },
};