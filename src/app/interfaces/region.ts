import { City } from "./city";

export interface Region {
  iso: string;
  name: string;
  province: string;
  lat: string;
  long: string;
  cities: City[];
}

export interface RegionDetails {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  confirmed_diff: number;
  deaths_diff: number;
  recovered_diff: number;
  last_update: string;
  active: number;
  active_diff: number;
  fatality_rate: number;
  region: Region;
}
