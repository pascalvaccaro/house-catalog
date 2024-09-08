import { JSX } from "preact/jsx-runtime";

export default function SelectState(
  { state, setState, ...props }: JSX.HTMLAttributes<HTMLSelectElement> & { state: HouseState; setState: (v: string) => void },
) {
  return (
    <select
      {...props}
      name="state"
      onChange={(e) => setState(e.currentTarget.value)}
      value={state}
    >
      <option value="created">Nouvelle maison</option>
      <option value="contacted">Contact pris</option>
      <option value="visiting">Visite prévue</option>
      <option value="visited">Visite faite</option>
      <option value="proposed">Proposition faite</option>
      <option value="sold">Déjà vendue</option>
      <option value="closed">Sous compromis</option>
      <option value="deleted">Éliminée</option>
    </select>
  );
}
