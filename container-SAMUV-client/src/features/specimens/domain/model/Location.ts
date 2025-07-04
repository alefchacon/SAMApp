import * as defaults from "@/utils/getOrDefault";

interface ILocation {
  id?: number;
  coordinates_cartesian_plane_x: number;
  coordinates_cartesian_plane_y: number;
  geographical_coordinates_x: number;
  geographical_coordinates_y: number;
  utm_region: string;
  msnm_google: number;
  altitude: number;
  institute_code: string;
  institute: string;
  specific_location: string;
  municipality: string;
  state: string;
  country: string;
  kilometer: string;
}

class Location implements ILocation {
  id?: number;
  coordinates_cartesian_plane_x: number = -1;
  coordinates_cartesian_plane_y: number = -1;
  geographical_coordinates_x: number = -1;
  geographical_coordinates_y: number = -1;
  utm_region: string = "";
  msnm_google: number = -1;
  altitude: number = -1;
  institute_code: string = "";
  institute: string = "";
  specific_location: string = "";
  municipality: string = "";
  state: string = "";
  country: string = "";
  kilometer: string = "";

  constructor(data: ILocation) {
    this.coordinates_cartesian_plane_x = defaults.getOrDefaultNumber(
      data.coordinates_cartesian_plane_x
    );
    this.coordinates_cartesian_plane_y = defaults.getOrDefaultNumber(
      data.coordinates_cartesian_plane_y
    );
    this.geographical_coordinates_x = defaults.getOrDefaultNumber(
      data.geographical_coordinates_x
    );
    this.geographical_coordinates_y = defaults.getOrDefaultNumber(
      data.geographical_coordinates_y
    );
    this.utm_region = defaults.getOrDefaultString(data.utm_region);
    this.msnm_google = defaults.getOrDefaultNumber(data.msnm_google);
    this.altitude = defaults.getOrDefaultNumber(data.altitude);
    this.institute_code = defaults.getOrDefaultString(data.institute_code);
    this.institute = defaults.getOrDefaultString(data.institute);
    this.specific_location = defaults.getOrDefaultString(
      data.specific_location
    );
    this.municipality = defaults.getOrDefaultString(data.municipality);
    this.state = defaults.getOrDefaultString(data.state);
    this.country = defaults.getOrDefaultString(data.country);
    this.kilometer = defaults.getOrDefaultString(data.kilometer);
  }
}

export default Location;
