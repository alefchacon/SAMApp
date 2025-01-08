import { useState, useMemo, useEffect } from "react"
import { MapContainer, TileLayer, Popup, Marker, SVGOverlay, GeoJSON } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import UtmLatLng from "utm-latlng";
import mexico from "../stores/mexico.json"
import { ROLE_TYPES } from "../../../stores/roleTypes";

const utmLatLng = new UtmLatLng();

export default function Map({
    specimens = [], 
    role = ROLE_TYPES.VISITOR
}){
    const [coordinates, setCoordinates] = useState([]);

    const getCoordinates = async (specimen) => {

        if (role !== ROLE_TYPES.TECHNICAL_PERSON){
            return;
        }

        const hasCoordinates = 
            Boolean(specimen.location.geographical_coordinates_x) 
            && Boolean(specimen.location.geographical_coordinates_y);

        if (hasCoordinates){
            return [
                specimen.location.geographical_coordinates_x, 
                specimen.location.geographical_coordinates_y
            ]
        }

        const zone = parseInt(specimen.location.utm_region.match(/\d+/)[0], 10);

        return new Promise((resolve) => {
            setTimeout(() => {
                const { lat, lng } = utmLatLng.convertUtmToLatLng(
                    specimen.location.coordinates_cartesian_plane_x,
                    specimen.location.coordinates_cartesian_plane_y,
                    zone,
                    "N"
                );
                resolve([lat, lng]);
            }, 0);
        });
    }

    const fetchAllCoordinates = async () => {
        const positions = await Promise.all(
            specimens.map((specimen) => getCoordinates(specimen))
        );
        setCoordinates(positions);
    };

    useEffect(() => {
        fetchAllCoordinates();
    }, [specimens]); 

    const veracruzCoordinates = [19.2041, -96.1431];


    const onEachFeature = (feature, layer) => {
        const specimenAmount = getStateSpecimens(feature).length;
        const specimenNoun = specimenAmount === 1 
            ? "espécimen"
            : "especímenes";
        const popupMessage = `
            ${specimenAmount} ${specimenNoun} de ${feature.properties.name}
        `
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(popupMessage);
        }
      };

    const getStateSpecimens = (feature) => {
        //Feature id: MX-<state initials>
        //example: Veracruz = MX-VER
        //Business uses codes like VER to refer to states.
        //Thus we extract the state code from the feature id.
        //Perhaps it'd be faster to modify the geojson itself but
        // idk if that will break anything and I aint got time to test that.
        const stateCode = feature.properties.id.split("-")[1];
        return specimens.filter(specimen => getSpecimenState(specimen) === stateCode)
    }

    const getSpecimenState = (specimen) => {
        return specimen?.location?.state || specimen.state;
    }

    const filterBySpecimen = (feature) => {
        return getStateSpecimens(feature).length > 0
    }

    const maxZoom = role === ROLE_TYPES.TECHNICAL_PERSON 
        ? 15
        : 6;

    const CoordinateMarkers = () => {
        return (<>
            {
                coordinates.map(([latitude, longitude], index) => (
                    Boolean(latitude) && Boolean(longitude) &&(
                    <Marker 
                        key={index}
                        position={[latitude, longitude]} 
                    >
                        <Popup>
                            Se encontraron especímenes aquí
                            <br></br>
                            
                            <br></br>
                            Latitud:  &nbsp;&nbsp;&nbsp;{latitude} <br></br>
                            Longitud: {longitude} <br></br>
                        </Popup>
                    </Marker>)
                ))
            }
        </>)
    }

    return (
        <MapContainer 
            center={veracruzCoordinates} 
            zoom={4} 
            minZoom={3} 
            maxZoom={maxZoom}
            style={{height: '400px', width: '100%', zIndex: "1"}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {role === ROLE_TYPES.TECHNICAL_PERSON &&
                <CoordinateMarkers/>
            }
            
            <GeoJSON data={mexico} onEachFeature={onEachFeature} filter={filterBySpecimen}/>
        </MapContainer>
      )
}