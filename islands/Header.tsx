import { JSX } from "preact/jsx-runtime";
import { operator } from "../signals/operator.ts";
import { getOperatorClass } from "../utils/color.ts";
import Fetcher from "../islands/Fetcher.tsx";

export default function Header({ isDev = false }) {
  const onChange: JSX.DOMAttributes<HTMLSelectElement>["onChange"] = (e) => {
    operator.value = e.currentTarget.value as Operator;
  };
  return (
    <div class="h-16 w-full flex justify-end gap-4 bg-black text-white">
      {isDev ? <Fetcher options={{ method: "delete" }}>Restore</Fetcher> : null}

      <select
        class="text-black m-4 px-2"
        onChange={onChange}
        value={operator.value}
      >
        {(["Danielle", "Pascal", "Raphaël"] as const).map((op) => (
          <option class={`px-2 ${getOperatorClass(op)}`} key={op} value={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}
