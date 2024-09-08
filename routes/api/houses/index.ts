/// <reference lib="deno.unstable" />
import type { Handlers } from "$fresh/server.ts"

const kv = await Deno.openKv()

export const handler: Handlers<House | null> = {
  async GET() {
    const houses = [];
    for await (const res of kv.list({ prefix: ['house']})) {
      houses.push(res.value)
    }
    return new Response(JSON.stringify(houses))
  },

  async POST(req) {
    const house = (await req.json()) as House;
    house.id ||= crypto.randomUUID()
    const houseKey = ['house', house.id]
    const ok = await kv.atomic().set(houseKey, house).commit();
    if (!ok) throw new Error('La maison existe déjà')
    return new Response(JSON.stringify(house))
  }
}