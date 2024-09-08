import type { ComponentChildren } from "preact";

export default function Fetcher(
  { url = "/", options = {}, children }: {
    url?: string;
    options: RequestInit;
    children: ComponentChildren;
  },
) {
  return <button onClick={() => fetch(url, options)}>{children}</button>;
}
