type Operator = "Danielle" | "Pascal" | "Raphaël";
type HouseState =
  | "created"
  | "contacted"
  | "visiting"
  | "visited"
  | "proposed"
  | "sold"
  | "closed"
  | "deleted";
type HouseHeating = 'fuel' | 'pump' | 'wood';
type HouseEvacuation = 'sewer' | 'fosse' | 'todo';
type House = {
  id: string;
  href: string;
  name: string;
  address: {
    street?: string;
    postalCode?: string;
    city: string;
    coordinates?: {
      lat: string;
      long: string;
    };
  };
  surface: {
    house: number;
    land?: number;
    deps?: number;
    rooms: number;
  };
  price: {
    displayed: number;
    proposed?: number;
  };
  comments: string[];
  contact: {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
  commodities: {
    heating: HouseHeating[];
    evacuation: HouseEvacuation;
    solar: boolean;
    source: boolean;
  }
  operator: Operator;
  state: HouseState;
  visitedAt?: string;
};
