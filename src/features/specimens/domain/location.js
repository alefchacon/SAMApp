import * as defaults from "../../../utils/getOrDefault";

class Location {
  constructor(
    data,
  ){
    this.coordinates_cartesian_plane_x = defaults.getOrDefaultNumber(data.coordinates_cartesian_plane_x);
    this.coordinates_cartesian_plane_y = defaults.getOrDefaultNumber(data.coordinates_cartesian_plane_y);
    this.geographical_coordinates_x = defaults.getOrDefaultNumber(data.geographical_coordinates_x);
    this.geographical_coordinates_y = defaults.getOrDefaultNumber(data.geographical_coordinates_y);
    this.utm_region = defaults.getOrDefaultString(data.utm_region);
    this.msnm_google = defaults.getOrDefaultNumber(data.msnm_google);
    this.altitude = defaults.getOrDefaultNumber(data.altitude);
    this.institute_code = defaults.getOrDefaultString(data.institute_code);
    this.institute = defaults.getOrDefaultString(data.institute);
    this.specific_location = defaults.getOrDefaultString(data.specific_location);
    this.municipality = defaults.getOrDefaultString(data.municipality);
    this.state = defaults.getOrDefaultString(data.state);
    this.country = defaults.getOrDefaultString(data.country);
    this.kilometer = defaults.getOrDefaultString(data.kilometer, "");

  }

}

export default Location;