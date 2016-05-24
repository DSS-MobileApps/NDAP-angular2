import { ProviderType } from '../categories/provider-type';

export class Search {
  // Type of Search
  type: string;

  // For Distance or Area search
  lat: number;
  lng: number;
  distance: number;

  // Postcode search
  postcode: number;

  // State search
  state: number;

  // ProviderType search
  providerType: ProviderType;
}
