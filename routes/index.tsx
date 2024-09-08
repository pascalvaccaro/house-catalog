/// <reference lib="deno.unstable" />
import { type Handlers, type PageProps } from "$fresh/server.ts";
import { parseHouseForm } from "../utils/form-data.ts";
import HouseForm from "../islands/HouseForm.tsx";
import HouseTable from "../islands/HouseTable.tsx";
import Modal from "../islands/Modal.tsx";

const kv = await Deno.openKv();

export const handler: Handlers<{ houses: House[] }> = {
  async GET(_, ctx) {
    const houses: House[] = [];
    for await (const res of kv.list<House>({ prefix: ["house"] })) {
      houses.push(res.value);
    }
    return ctx.render({ houses });
  },

  async POST(req, _) {
    const form = await req.formData();
    const house = await parseHouseForm(form, kv);
    const ok = await kv.atomic().set(["house", house.id], house).commit();
    if (!ok) throw new Error("La maison existe déjà");
    return handler.GET!(req, _);
  },

  async DELETE(_, ctx) {
    for await (const res of kv.list<House>({ prefix: ["house"] })) {
      await kv.atomic().delete(res.key).commit();
    }
    return ctx.render({ houses: [] });
  },
};

export default function Home(props: PageProps<{ houses: House[] }>) {
  return (
    <>
      <HouseTable houses={props.data.houses} kv={kv} />
      <Modal title="Ajouter une maison">
        <HouseForm />
      </Modal>
    </>
  );
}
