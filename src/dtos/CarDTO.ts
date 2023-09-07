interface AccessoriesDTO {
  id: string;
  type: string;
  name: string;
};

interface PhotosDTO {
  id: string;
  photo: string;
}

export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: string;
  fuel_type: string;
  thumbnail: string;
  accessories: AccessoriesDTO[];
  photos: PhotosDTO[];
}