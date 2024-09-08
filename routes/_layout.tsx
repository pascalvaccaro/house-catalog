import type { PageProps } from "$fresh/server.ts";
import Header from "../islands/Header.tsx";

export default function Layout({ Component }: PageProps) {
  const isDev = Deno.env.get("DENO_ENV") === "development";

  return (
    <div class="w-full h-full flex flex-col">
      <Header isDev={isDev} />
      <div class="w-full p-8 flex-grow">
        <Component />
      </div>
    </div>
  )
}