import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { api } from "../../../lib/apiClient";
import axios from "axios";

import Tabs from "../../../components/ui/Tabs";
import TextField from "../../../components/ui/TextField";
import Card from "../../../components/ui/Card";
import Taxonomy from "../../../features/specie/components/Taxonomy";
import { colors } from "../../../features/graphing/Colors";
import Footer from "../../../components/ui/Footer";

export default function Search() {
  const [speciesByName, setSpeciesByName] = useState([]);
  const [speciesByFamily, setSpeciesByFamily] = useState([]);
  const [speciesByOrden, setSpeciesByOrden] = useState([]);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q"));

  console.log(query);

  useEffect(() => {
    const byScientificName = api.get(`species/scientific_name/${query}`);
    const byFamily = api.get(`species/family/${query}`);
    const byOrden = api.get(`species/orden/${query}`);

    axios.all([byScientificName, byFamily]).then(
      axios.spread((byScientificName, byFamily, byOrden) => {
        setSpeciesByName(byScientificName?.data);
        setSpeciesByFamily(byFamily?.data);
        setSpeciesByOrden(byOrden?.data);
      })
    );
  }, [query]);

  function SpecieResults({ label = "label", species }) {
    return (
      <div label={label}>
        {speciesByName.map((specie) => (
          <div>{specie.scientific_name}</div>
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

  return (
    <div className="w-100 h-100">
      <div className="p-1rem bg-white flex-col justify-content-center align-items-center page-padding">
        <br />
        <TextField
          iconType={"search"}
          placeholder={"Buscar especies"}
          value={"asdf"}
        ></TextField>
      </div>
      <Tabs>
        {speciesByName.length > 0 && (
          <div label="Nombres">
            <br />
            <br />
            <div className="page-padding">
              {speciesByName.map((specie) => (
                <CardSpecie specie={specie} />
              ))}
            </div>
          </div>
        )}
        {speciesByFamily.length > 0 && (
          <div label="Familias">
            <br />
            <br />
            <div className="flex-col page-padding gap-1rem">
              {speciesByFamily.map((specie) => (
                <CardSpecie specie={specie} />
              ))}
            </div>
          </div>
        )}
        {speciesByOrden?.length > 0 && (
          <div label="Ordenes">
            <div className="page-padding">
              {speciesByOrden.map((specie) => (
                <div>{specie.scientific_name}</div>
              ))}
            </div>
          </div>
        )}
      </Tabs>
      <Footer></Footer>
    </div>
  );
}
