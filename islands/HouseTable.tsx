import { houseEdited } from "../signals/edition.ts";
import HouseRow from "./HouseRow.tsx";

export default function HouseTable(
  { houses, kv }: { houses: House[]; kv: Deno.Kv },
) {
  const handleChangeState = (house: House) => async (state: HouseState) => {
    await kv.atomic().set(["house", house.id], { ...house, state }).commit();
  };

  return (
    <table class="house__table">
      <thead>
        <tr>
          <th rowSpan={2} colSpan={1}>Statut</th>
          <th rowSpan={2} colSpan={1}>Nom</th>
          <th rowSpan={1} colSpan={2}>Prix</th>
          <th rowSpan={1} colSpan={2}>Surface</th>
          <th rowSpan={2} colSpan={1}>Pièces</th>
          <th rowSpan={2} colSpan={1}>Adresse</th>
          <th rowSpan={1} colSpan={2}>Actions</th>
        </tr>
        <tr>
          <th>Affiché</th>
          <th>Proposé</th>
          <th>Maison</th>
          <th>Terrain</th>
          <th>Editer</th>
          <th>Éliminer</th>
        </tr>
      </thead>
      <tbody>
        {houses.map((house) => (
          <HouseRow
            key={house.id}
            house={house}
            onChangeState={handleChangeState(house)}
            onEdit={() => houseEdited.value = house}
          />
        ))}
      </tbody>
    </table>
  );
}
