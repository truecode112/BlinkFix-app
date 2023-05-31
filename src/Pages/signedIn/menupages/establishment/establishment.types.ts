export interface CreateInterfaceType {
  name: string;
  vatNumber: string;
  cuisineNames: string[];
  address: {
    country: string;
    city: string;
    state: string;
    postcode: string;
    street: string;
    buildingnumber: string;
  };
  delivery: {
    isDelivery: boolean;
    isPickup: boolean;
  };
  isHalal: boolean;
  isKosher: boolean;
  isVegan: boolean;
  location: {
    latitude: number;
    longatitude: number;
  };
  openHours: {
    day: string;
    hours: {
      open: string;
      close: string;
    };
  }[];
}
export const initialHours = [
  {
    day: 'monday',
    hours: {
      open: '10:00',
      close: '22:00',
    },
  },
  {
    day: 'tuesday',
    hours: {
      open: '10:00',
      close: '22:00',
    },
  },
  {
    day: 'wednesday',
    hours: {
      open: '10:00',
      close: '22:00',
    },
  },
  {
    day: 'thursday',
    hours: {
      open: '10:00',
      close: '22:00',
    },
  },
  {
    day: 'friday',
    hours: {
      open: '10:00',
      close: '22:00',
    },
  },
  {
    day: 'saturday',
    hours: {
      open: '10:00',
      close: '22:00',
    },
  },
  {
    day: 'Sunday',
    hours: {
      open: '10:00',
      close: '22:00',
    },
  },
];

export const initialCreateForm: CreateInterfaceType = {
  name: 'Karolowo',
  vatNumber: 'PL9999999999',
  cuisineNames: [],
  address: {
    country: 'Polska',
    city: 'Kraków',
    state: 'Małopolska',
    postcode: '32-000',
    street: 'długa',
    buildingnumber: '28',
  },
  delivery: {
    isDelivery: false,
    isPickup: false,
  },
  isHalal: false,
  isKosher: false,
  isVegan: false,
  location: {
    latitude: 51.04151778368207,
    longatitude: 19.64179294684423,
  },
  openHours: initialHours,
};
