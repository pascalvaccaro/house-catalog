import { useSignal } from "@preact/signals";

const isAllowedState = (value: string): value is HouseState =>
  [
    "created",
    "contacted",
    "visiting",
    "visited",
    "proposed",
    "sold",
    "closed",
    "deleted",
  ].includes(value);

export const useHouse = (initState?: HouseState) => {
  const houseState = useSignal<HouseState>(initState ?? "created");
  const isStroked = ["deleted", "sold", "closed"].includes(houseState.value);

  const changeState = (state: string, callback?: (newState: HouseState) => Promise<void>) => {
    if (isAllowedState(state)) {
      houseState.value = state;
      if (typeof callback === 'function') return callback(state)
    }
  };

  return { state: houseState, setState: changeState, isStroked };
};
