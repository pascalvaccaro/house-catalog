import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { houseEdited } from "../signals/edition.ts";
import type { ComponentChildren } from "preact";

export default function Modal({ children, title }: { children: ComponentChildren, title: string }) {
  const show = useSignal(false);
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code.toLowerCase() === "esc") show.value = false;
  };
  useEffect(() => houseEdited.subscribe(v => {
    if (v && !show.value) show.value = true
  }), [show])
  useEffect(() => show.subscribe((s) => {
    if (!s && houseEdited.value) houseEdited.value = undefined
  }), [show])

  return show.value
    ? (
      <div
        class="w-[100vw] h-[100vh] z-10 bg-slate-200 bg-opacity-50 fixed top-0 left-0 flex justify-center items-center p-8"
        onKeyUp={handleKeyUp}
      >
        <div class="min-h-4/5 min-w-4/5 p-2 opacity-100 rounded-lg relative  bg-green-100">
          <button
            class="absolute rounded-full flex items-center justify-center pb-1 h-6 w-6 text-lg top-1 right-1 bg-red-500 text-white font-bold"
            onClick={() => show.value = false}
          >
            x
          </button>
          {children}
        </div>
      </div>
    )
    : (
      <button
        class="fixed text-5xl pb-3 flex items-center justify-center w-12 h-12 bottom-4 right-4 rounded-full font-bold text-white bg-green-700"
        onClick={() => show.value = true}
        title={title}
      >
        +
      </button>
    );
}
