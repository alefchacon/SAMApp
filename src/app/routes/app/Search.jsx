import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { api } from "../../../dataAccess/apiClient";
import axios from "axios";

import Tabs from "../../../components/ui/Tabs";
import TextField from "../../../components/ui/TextField";
import Card from "../../../components/ui/Card";
import Taxonomy from "../../../features/specie/components/Taxonomy";
import { colors } from "../../../features/graphing/Colors";
import Footer from "../../../components/ui/Footer";
import SearchField from "../../../components/ui/SearchField";
import NoResults from "../../../components/ui/NoResults";

export default function Search() {
  const [speciesByName, setSpeciesByName] = useState([]);
  const [speciesByFamily, setSpeciesByFamily] = useState([]);
  const [speciesByOrden, setSpeciesByOrden] = useState([]);
  const [searchParams] = useSearchParams();
  //const [query, setQuery] = useState(searchParams.get("q"));

  console.log(searchParams.get("q"));

  useEffect(() => {
    const query = searchParams.get("q");
    const byScientificName = api.get(`species/scientific_name/${query}`);
    const byFamily = api.get(`species/family/${query}`);
    const byOrden = api.get(`species/orden/${query}`);

    axios.all([byScientificName, byFamily, byOrden]).then(
      axios.spread((byScientificName, byFamily, byOrden) => {
        console.log(byScientificName);
        console.log(byFamily);
        setSpeciesByName(byScientificName?.data);
        setSpeciesByFamily(byFamily?.data);
        setSpeciesByOrden(byOrden?.data);
      })
    );
  }, [searchParams]);

  function SpecieResults({ label = "label", species }) {
    return (
      <div label="Nombres / Géneros" className="page-padding">
        <br />
        <br />
        {species.map((specie) => (
          <CardSpecie specie={specie} />
        ))}
      </div>
    );
  }

  function CardSpecie({ specie }) {
    return (
      <div style={{ fontSize: "16px" }} className="card border">
        <div
          className="flex-col "
          style={{ fontWeight: "600", paddingBottom: "10px" }}
        >
          {specie.scientific_name}
        </div>
        <Taxonomy specie={specie} center={false}></Taxonomy>
      </div>
    );
  }

  function ResultList({ species = [] }) {
    return (
      <>
        {species.length ? (
          species.map((specie) => <CardSpecie specie={specie} />)
        ) : (
          <NoResults />
        )}
      </>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
      }}
    >
      <div className="flex-col" style={{ flexGrow: "1" }}>
        <div className="page-padding bg-white">
          <br />
          <SearchField></SearchField>
          <br />
        </div>
        <Tabs center>
          <div label="Nombres / Géneros" className="page-padding">
            <br />
            <br />
            <ResultList species={speciesByName} />
          </div>

          <div label="Familias">
            <br />
            <br />
            <div className="flex-col page-padding gap-1rem">
              <ResultList species={speciesByFamily} />
            </div>
          </div>

          <div label="Ordenes">
            <div className="page-padding">
              <ResultList species={speciesByOrden} />
            </div>
          </div>
        </Tabs>
      </div>
      <Footer></Footer>
    </div>
  );
}
