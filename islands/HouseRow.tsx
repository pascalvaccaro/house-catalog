import SelectState from "../components/SelectState.tsx";
import { useHouse } from "../signals/house.ts";
import { getOperatorClass } from "../utils/color.ts";
import { formatPrice, formatSurface } from "../utils/number.ts";

export default function HouseRow(
  { house, onChangeState, onEdit }: {
    house: House;
    onChangeState: (newState: HouseState) => Promise<void>;
    onEdit: () => void;
  },
) {
  const { isStroked, state, setState } = useHouse(house.state);
  
  const fullAddress = [
    house.address.street,
    house.address.postalCode,
    house.address.city,
  ]
    .filter(Boolean).join(" ");
  const handleChangeState = async (newState: string) => {
    if (state.value === newState) return;
    await setState(newState, onChangeState);
  };

  return (
    <tr class={isStroked ? "line-through" : ""}>
      <td class="text-center bg-">
        <SelectState class={getOperatorClass(house.operator)} state={state.value} setState={handleChangeState} />
      </td>
      <td>
        <a class="underline text-blue-500" href={house.href} target="_blank">
          {house.name}
        </a>
      </td>
      <td class="text-center">{formatPrice(house.price.displayed)}</td>
      <td class="text-center">
        {house.price.proposed ? formatPrice(house.price.proposed) : "-"}
      </td>
      <td class="text-center">{formatSurface(house.surface.house)}</td>
      <td class="text-center">{formatSurface(house.surface.land ?? 0)}</td>
      <td class="text-center">{house.surface.rooms}</td>
      <td>{fullAddress}</td>
      <td class="cursor-pointer text-center text-lg" onClick={onEdit}>
        &#x270E;
      </td>
      <td
        class="cursor-pointer text-center text-lg"
        onClick={() => onChangeState("deleted")}
      >
        &#128465;
      </td>
    </tr>
  );
}
