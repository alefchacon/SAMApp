import Location from "@/features/specimens/domain/model/Location";
import Specimen from "@/features/specimens/domain/model/Specimen";
import UtmLatLng from "utm-latlng";

export async function getCoordinates(
  specimen: Specimen
): Promise<[number, number]> {
  if (!specimen.location) {
    throw new TypeError("Location cannot be undefined");
  }

  const hasCoordinates =
    specimen.location &&
    specimen.location.geographical_coordinates_x &&
    specimen.location.geographical_coordinates_y;

  if (hasCoordinates) {
    return Promise.resolve([
      specimen.location.geographical_coordinates_x,
      specimen.location.geographical_coordinates_y,
    ]);
  }

  const location: Location = specimen.location;
  const zoneMatch = location.utm_region?.match(/\d+/);
  const zone = parseInt(zoneMatch ? zoneMatch[0] : "0", 10);

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
