import React, { useEffect, useState } from "react";
import { useSpecie } from "@/features/specie/businessLogic/useSpecie";
import { ITaxon } from "@/features/specie/domain/Taxon";
import CardBase from "@/components/ui/CardBase";
import { Badge } from "@/components/ui/Badge";
import { useNavigate } from "react-router-dom";
import Header from "@/components/ui/Header";
export default function SpecieOrdens() {
  const [ordens, setOrdens] = useState<ITaxon[]>([]);
  const { getOrdens } = useSpecie();
  const navigate = useNavigate();
  useEffect(() => {
    getOrdens().then((ordens) => {
      setOrdens(ordens);
    });
  }, []);

  return (
    <div className="w-full">
      <Header
        title={"Colección de mamíferos"}
        subtitle={
          "Seleccione una de las siguientes ordenes para consultar sus rangos taxonómicos, especies y especímenes."
        }
      ></Header>
      <div className="grid w-full gap-5 py-5 page-padding">
        {ordens?.map((orden, index) => (
          <CardBase
            onClick={() => navigate(`?order=${orden.taxon_name}`)}
            title={orden.taxon_name}
            clickable
            content={
              <div className="flex flex-row gap-2">
                <Badge>{orden.rank_name}</Badge>
                <Badge variant={"outline"}>
                  {orden.specimen_count} especímenes
                </Badge>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
