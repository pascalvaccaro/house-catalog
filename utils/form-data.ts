import { ulid } from 'jsr:@std/ulid';

export const parseHouseForm = async (form: FormData, kv: Deno.Kv): Promise<House> => {
  const id = form.get('id')?.toString() || ulid();
  console.log('formId', form.get('id'))
  console.log('id', id)
  console.log('ulid', ulid())
  const comment = form.get('comment')?.toString()
  const comments = await kv.get<House>(['house', id])
    .then((h) => h.value?.comments ?? [])
    .then(list => list.concat(comment ? [comment] : []))

  return {
    id,
    href: form.get('href')!.toString(),
    address: {
      street: form.get('street')?.toString(),
      postalCode: form.get('postalCode')?.toString(),
      city: form.get('city')!.toString(),
      coordinates: {
        lat: form.get('lat')?.toString() || '',
        long: form.get('long')?.toString() || ''
      }
    },
    comments,
    commodities: {
      heating: form.getAll('heating') as HouseHeating[],
      evacuation: form.get('evacuation')?.toString() as HouseEvacuation,
      solar: form.get('solar')?.toString() === 'true',
      source: form.get('source')?.toString() === 'true'
    },
    contact: {
      name: form.get('contact')?.toString(),
      email: form.get('email')?.toString(),
      phone: form.get('phone')?.toString(),
      website: form.get('website')?.toString(),
    },
    name: form.get('name')!.toString(),
    operator: form.get('operator')!.toString() as Operator,
    price: {
      displayed: Number(form.get('price')?.toString() || 0),
      proposed: Number(form.get('proposition')?.toString() || 0)
    },
    state: form.get('state')?.toString() as HouseState ?? 'created',
    surface: {
      deps: Number(form.get('deps')?.toString() || 0),
      house: Number(form.get('surface')!.toString() || 0),
      land: Number(form.get('land')?.toString() || 0),
      rooms: Number(form.get('rooms')!.toString() || 1),
    },
  }
}