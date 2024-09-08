import { useEffect, useRef } from "preact/hooks";
import SelectState from "../components/SelectState.tsx";
import { useHouse } from "../signals/house.ts";
import { operator } from "../signals/operator.ts";
import { houseEdited } from "../signals/edition.ts";

export default function HouseForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { state: houseState, setState: changeState } = useHouse(
    houseEdited.value?.state,
  );

  const handleResetForm = () => {
    if (houseEdited.value) houseEdited.value = undefined;
    if (formRef.current) formRef.current.reset();
  };
  useEffect(() =>
    houseEdited.subscribe((value) => {
      if (!value && formRef.current) formRef.current.reset();
    }), []);

  return (
    <div class="flex flex-col gap-8 items-center justify-center px-4 py-8">
      <form
        class="house__form"
        method="post"
        ref={formRef}
      >
        <fieldset>
          <legend>Informations générales</legend>
          <label for="name">
            <p>Nom de la maison</p>
            <input
              id="name"
              name="name"
              type="text"
              value={houseEdited.value?.name ?? ""}
              required
            />
          </label>
          <label for="href">
            <p>Lien / URL de la maison</p>
            <input
              id="href"
              name="href"
              type="url"
              value={houseEdited.value?.href ?? ""}
              required
            />
          </label>
          <label for="price">
            <p>Prix affiché</p>
            <input
              id="price"
              name="price"
              type="text"
              pattern="\d+"
              value={houseEdited.value?.price.displayed ?? ""}
              required
            />
          </label>
          <label for="proposition">
            <p>Prix proposé</p>
            <input
              id="proposition"
              name="proposition"
              type="text"
              pattern="\d+"
              value={houseEdited.value?.price.proposed ?? ""}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Adresse</legend>
          <label for="city">
            <p>Localité</p>
            <input
              id="city"
              name="city"
              type="text"
              value={houseEdited.value?.address.city ?? ""}
              required
            />
          </label>
          <label for="street">
            <p>Nom de la rue / lieu-dit</p>
            <input
              id="street"
              name="street"
              type="text"
              value={houseEdited.value?.address.street ?? ""}
            />
          </label>
          <label for="postalCode">
            <p>Code postal</p>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={houseEdited.value?.address.postalCode ?? ""}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Surface</legend>
          <label for="surface">
            <p>Surface de la maison</p>
            <input
              id="surface"
              name="surface"
              type="text"
              pattern="\d+"
              value={houseEdited.value?.surface.house ?? ""}
              required
            />
          </label>
          <label for="land">
            <p>Surface du terrain</p>
            <input
              id="land"
              name="land"
              type="text"
              pattern="\d+"
              value={houseEdited.value?.surface.land ?? ""}
            />
          </label>
          <label for="rooms">
            <p>Nombre de pièces</p>
            <input
              id="rooms"
              name="rooms"
              type="number"
              min="1"
              value={houseEdited.value?.surface.rooms ?? ""}
              required
            />
          </label>
          <label for="deps">
            <p>Dépendances</p>
            <input
              id="deps"
              name="deps"
              type="text"
              value={houseEdited.value?.surface.deps ?? ""}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Contact</legend>
          <label for="contact">
            <p>Nom / prénom</p>
            <input
              id="contact"
              name="contact"
              type="contact"
              value={houseEdited.value?.contact.name ?? ""}
            />
          </label>
          <label for="email">
            <p>Email</p>
            <input
              id="email"
              name="email"
              type="email"
              value={houseEdited.value?.contact.email ?? ""}
            />
          </label>
          <label for="phone">
            <p>Téléphone</p>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={houseEdited.value?.contact.phone ?? ""}
            />
          </label>
          <label for="website">
            <p>Site web</p>
            <input
              id="website"
              name="website"
              type="url"
              value={houseEdited.value?.contact.website ?? ""}
            />
          </label>
        </fieldset>
        <fieldset class="!col-span-4">
          <legend>Commodités</legend>
          <label for="heating" class="row">
            <p class="font-bold">Chauffage</p>
            <div class="fieldgroup">
              <p>
                Fioul
                <input type="checkbox" name="heating" value="fuel" />
              </p>
              <p>
                Aérothermie
                <input type="checkbox" name="heating" value="pump" />
              </p>
              <p>
                Cheminée
                <input type="checkbox" name="heating" value="wood" />
              </p>
            </div>
          </label>
          <label for="evacuation" class="row">
            <p class="font-bold">Assainissement</p>
            <div class="fieldgroup">
              <p>
                Tout-à-l'égout
                <input type="checkbox" name="evacuation" value="sewer" />
              </p>
              <p>
                Fosse septique
                <input type="checkbox" name="evacuation" value="fosse" />
              </p>
              <p>
                À refaire
                <input type="checkbox" name="evacuation" value="todo" />
              </p>
            </div>
          </label>
          <label for="solar" class="row">
            <p class="font-bold">Équipements</p>
            <div class="fieldgroup">
              <p>
                Panneaux solaires
                <input type="checkbox" name="solar" value="true" />
              </p>
              <p>
                Source d'eau
                <input type="checkbox" name="source" value="true" />
              </p>
            </div>
          </label>
          <label for="comment" class="mt-4">
            <p>Ajouter un commentaire</p>
            <textarea id="comment" name="comment" rows={4} />
          </label>
        </fieldset>

        <input name="id" type="hidden" value={houseEdited.value?.id ?? ""} />
        <input
          name="operator"
          type="hidden"
          value={houseEdited.value?.operator ?? operator.value}
        />

        <SelectState
          class="w-full"
          state={houseState.value}
          setState={changeState}
        />

        <div class="flex">
          {houseState.value === "visiting"
            ? (
              <input
                class="w-full"
                id="visitedAt"
                lang="fr-FR"
                name="visitedAt"
                type="datetime-local"
                value={houseEdited.value?.visitedAt ?? ""}
                required
              />
            )
            : houseEdited.value?.visitedAt
            ? (
              <p>
                Visitée le{" "}
                {new Date(houseEdited.value.visitedAt).toLocaleDateString()}
              </p>
            )
            : null}
        </div>

        <input class="col-span-3" type="submit" value="Envoyer" />
        <button
          class="border border-black rounded hover:bg-red-700 hover:text-white font-bold"
          type="button"
          onClick={handleResetForm}
        >
          Effacer
        </button>
      </form>
    </div>
  );
}
