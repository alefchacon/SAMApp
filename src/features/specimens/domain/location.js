import * as defaults from "../../../stores/getOrDefault";

class Location {
  constructor(
    data,
  ){
    this.coordinates_cartesian_plane_x = data.coordinates_cartesian_plane_x;
    this.coordinates_cartesian_plane_y = data.coordinates_cartesian_plane_y;
    this.geographical_coordinates_x = defaults.getOrDefaultNumber(data.geographical_coordinates_x);
    this.geographical_coordinates_y = defaults.getOrDefaultNumber(data.geographical_coordinates_y);
    this.utm_region = data.utm_region;
    this.msnm_google = data.msnm_google;
    this.altitude = defaults.getOrDefaultNumber(data.altitude);
    this.institute_code = data.institute_code;
    this.institute = data.institute;
    this.specific_location = data.specific_location;
    this.municipality = data.municipality;
    this.state = data.state;
    this.country = data.country;
  }

}

export default Location;