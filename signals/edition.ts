import { signal } from "@preact/signals";

export const houseEdited = signal<House | undefined>(undefined)
export const houseCreated = signal(false)