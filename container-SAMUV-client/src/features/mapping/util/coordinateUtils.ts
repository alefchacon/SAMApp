import Location from "@/features/specimens/domain/model/Location";
import Specimen from "@/features/specimens/domain/model/Specimen";
import UtmLatLng from "utm-latlng";

function coordinateExists(coordinate: number) {
  return coordinate !== null && coordinate !== undefined && coordinate !== 0;
}

export async function getGeographicalCoordinates(
  specimen: Specimen
): Promise<[number, number]> {
  if (!specimen.location) {
    throw new TypeError("Location cannot be undefined");
  }

  const hasCoordinates =
    Boolean(specimen.location) &&
    coordinateExists(specimen.location.geographical_coordinates_x) &&
    coordinateExists(specimen.location.geographical_coordinates_y);

  if (hasCoordinates) {
    return Promise.resolve([
      specimen.location.geographical_coordinates_x,
      specimen.location.geographical_coordinates_y,
    ]);
  }

  const location: Location = specimen.location;
  const zoneMatch = location.utm_region?.match(/\d+/);
  const zone = parseInt(zoneMatch ? zoneMatch[0] : "0", 10);

  // return [19.4326, -99.1332]
  const utmLatLng = new UtmLatLng();
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = utmLatLng.convertUtmToLatLng(
        location.coordinates_cartesian_plane_x,
        location.coordinates_cartesian_plane_y,
        zone,
        "N"
      );

      if (result && typeof result === "object") {
        const { lat, lng } = result;
        resolve([lat, lng]);
      } else {
        resolve([0, 0]);
      }
    }, 0);
  });
}
