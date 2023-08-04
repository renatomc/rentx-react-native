interface AccessoriesDTO {
  type: string;
  name: string;
};

interface RentDTO {
  period: string;
  price: number;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: RentDTO;
  fuel_type: string;
  thumbnail: string;
  accessories: AccessoriesDTO[];
  photos: string[];
}