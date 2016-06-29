import { NDAPMarker } from '../shared/ndap-marker-interface';
export class Organisation implements NDAPMarker {
  Id: number;
  Name: string;
  Category: string;
  StreetAddress: string;
  Suburb: string;
  Postcode: number;
  State: string;
  Email: string;
  Phone: string;
  PhoneAsE164: string;
  Fax: string;
  Website: string;
  Lng: number;
  Lat: number;
  Distance: string;
}
