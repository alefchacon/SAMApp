import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import useApi from "../../../dataAccess/useApi";
import axios from "axios";

import ChipLabel from "../../../components/ui/ChipLabel";
import Tabs from "../../../components/ui/Tabs";
import Footer from "../../../components/ui/Footer";

import CardSpecie from "../../../features/specie/components/CardSpecie";
import Specie from "../../../features/specie/domain/specie";
import Searchbar from "../../../components/ui/Searchbar";
import ROUTES from "../../../routing/frontendRoutes";
export default function Search() {
  const [speciesByName, setSpeciesByName] = useState([]);
  const [speciesByFamily, setSpeciesByFamily] = useState([]);
  const [speciesByOrden, setSpeciesByOrden] = useState([]);
  const [searchParams] = useSearchParams();
  const {apiWrapper} = useApi();
  const navigate = useNavigate();
  useEffect(() => {
    const query = searchParams.get("q");
    if (!query) {
      return
    }

    const byScientificName = apiWrapper.get(`species/scientific_name/${query}`);
    const byFamily = apiWrapper.get(`species/family/${query}`);
    const byOrden = apiWrapper.get(`species/orden/${query}`);

    axios.all([byScientificName, byFamily, byOrden]).then(
      axios.spread((byScientificName, byFamily, byOrden) => {
        setSpeciesByName(byScientificName?.data.map(specie => new Specie(specie)));
        setSpeciesByFamily(byFamily?.data);
        setSpeciesByOrden(byOrden?.data);
      })
    );
  }, [searchParams]);

  const navigateToCollection = (specieId = 1) => {
    navigate(`${ROUTES.COLLECTION}/${specieId}`)
  }

  function SpecieResults({ species }) {
    return (
      <div className="page-padding flex-col gap-1rem">
        {species.map((specie) => (
          <div className="rounded-5 selectable p-1rem" onClick={() => navigateToCollection(specie.id)}>
            <CardSpecie showRankName specie={new Specie(specie)} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-100 h-100">
      <div className="bg-gradient p-1rem flex-col justify-content-center align-items-center page-padding">
        <br />
        <Searchbar></Searchbar>
      </div>
      <Tabs center>
        <div label= 
          <div className="flex-row gap-05rem">
            Nombres <ChipLabel>{speciesByName.length}</ChipLabel>                
          </div>
        >
          <br />
          <SpecieResults species={speciesByName}></SpecieResults>
        </div>
        
        <div label=
          <div className="flex-row gap-05rem">
            Familias <ChipLabel>{speciesByFamily.length}</ChipLabel>                
          </div>
        >
          <br />
          <SpecieResults species={speciesByFamily}></SpecieResults>
        </div>
        <div label=
          <div className="flex-row gap-05rem">
            Órdenes <ChipLabel>{speciesByOrden.length}</ChipLabel>                
          </div>
        >
          <br />
          <SpecieResults species={speciesByOrden}></SpecieResults>
        </div>
        
      </Tabs>
      <Footer></Footer>
    </div>
  );
}
