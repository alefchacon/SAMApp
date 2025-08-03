import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Popup, Marker, GeoJSON } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import mexico from "../stores/mexico.json";
import { UserRoles } from "@/stores/EUserRoles";
import Specimen from "@/features/specimens/domain/model/Specimen";
import { getCoordinates } from "../util/coordinateUtils";
import type { GeoJsonObject } from "geojson";

interface IMapProps {
  specimens: Specimen[];
  role: UserRoles;
}
export default function Map(props: IMapProps) {
  const { specimens = [], role = UserRoles.VISITOR } = props;
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  console.error(role);

  const fetchAllCoordinates = async () => {
    if (role !== UserRoles.TECHNICAL_PERSON) {
      return;
    }

    const positions = await Promise.all(
      specimens.map((specimen) => getCoordinates(specimen))
    );
    setCoordinates(positions);
  };

  useEffect(() => {
    fetchAllCoordinates();
  }, [specimens]);

  const onEachFeature = (feature: any, layer: any) => {
    console.error(feature);
    const specimenAmount = getStateSpecimens(feature).length;
    const specimenNoun = specimenAmount === 1 ? "espécimen" : "especímenes";
    const popupMessage = `${specimenAmount} ${specimenNoun} de ${feature.properties.name}`;
    console.error(specimenAmount);
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(popupMessage);
    }
  };

  const getStateSpecimens = (feature: any) => {
    //Feature id: MX-<state initials>
    //example: Veracruz = MX-VER
    //Business uses codes like VER to refer to states.
    //Thus we extract the state code from the feature id.
    //Perhaps it'd be faster to modify the geojson itself but
    // idk if that will break anything and I aint got time to test that.
    const stateCode = feature.properties.id.split("-")[1];
    return specimens.filter(
      (specimen) => getSpecimenState(specimen) === stateCode
    );
  };

  const getSpecimenState = (specimen: Specimen) => {
    return specimen?.location?.state;
  };

  const filterBySpecimen = (feature: any) => {
    console.error(feature);
    return getStateSpecimens(feature).length > 0;
  };

  const CoordinateMarkers = () => {
    return (
      <>
        {coordinates.map(
          ([latitude, longitude], index) =>
            Boolean(latitude) &&
            Boolean(longitude) && (
              <Marker key={index} position={[latitude, longitude]}>
                <Popup>
                  Se encontraron especímenes aquí
                  <br></br>
                  <br></br>
                  Latitud: &nbsp;&nbsp;&nbsp;{latitude} <br></br>
                  Longitud: {longitude} <br></br>
                </Popup>
              </Marker>
            )
        )}
      </>
    );
  };

  // DEV ONLY: instead of passing the role, pass the profile and then validate with that.
  const maxZoom = role === UserRoles.TECHNICAL_PERSON ? 15 : 6;
  const veracruzCoordinates: LatLngTuple = [19.2041, -96.1431];
  return (
    <MapContainer
      center={veracruzCoordinates}
      zoom={4}
      minZoom={3}
      maxZoom={maxZoom}
      style={{ height: "400px", width: "100%", zIndex: "1" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {role === UserRoles.TECHNICAL_PERSON && <CoordinateMarkers />}

      <GeoJSON
        data={mexico as GeoJsonObject}
        onEachFeature={onEachFeature}
        filter={filterBySpecimen}
      />
    </MapContainer>
  );
}
