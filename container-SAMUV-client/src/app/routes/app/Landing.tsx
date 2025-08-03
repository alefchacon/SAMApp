import Footer from "@/components/ui/Footer";
import ROUTES from "@/routing/FrontendRoutes";
import React from "react";
import { Navbar } from "@/components/ui/navbar-ts/Navbar";
import { Link } from "react-router-dom";
import SearchInput from "@/components/ui/SearchInput";
import useSearch from "@/features/specie/businessLogic/useSearch";

interface ISearchBannerProps {
  children: React.ReactNode;
}
function SearchBanner(props: ISearchBannerProps) {
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="landing-search bg-gradient-2 flex-grow-1 justify-content-center"
    >
      {props.children}
    </div>
  );
}

interface ILandingProps {
  children?: React.ReactNode;
}
export default function Landing(props: ILandingProps) {
  const { search } = useSearch();
  return (
    <div className="flex flex-col">
      <SearchBanner>
        <div className="flex flex-row gap-5 items-center">
          <div className="relative flex justify-center items-center">
            <div id="logo-bg" className="relative bg-white"></div>
            <img
              id="logo"
              className="absolute"
              style={{
                height: "17vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              src={"/LOGO_LAB.png"}
              alt="Logo del Laboratorio de Vertebrados"
            />
          </div>
          <div>
            <h2 id="landing-system-name">
              Colección de mamíferos del Instituto de Investigaciones Biológicas
              <br />
              de la Universidad Veracruzana
            </h2>
            <h1 id="landing-tag">
              Acceso abierto a los mamíferos veracruzanos
            </h1>
          </div>
        </div>
        <br />
        <SearchInput onSubmit={search}></SearchInput>
        {props.children}
      </SearchBanner>

      <div className="page-padding p-2 g-2 d-flex flex-column">
        <h2>Sobre la colección de mamíferos</h2>
        <p className="font-bold underline text-3x1 bg-indigo-100 hover:bg-indigo-500">
          asdf
        </p>
        <p>
          La colección de mamíferos provee un espacio de custodia de ejemplares
          de los mamíferos silvestres del estado de Veracruz, con el fin de
          documentar su diversidad, distribución, abundancia, información
          científica y empírica generada que promueva los estudios de
          sistemática biológica como aquellos de índole ecológica, permitiendo
          así la conservación y manejo de los mamíferos silvestres y de sus
          sistemas ecológicos.
          <br />
          <br />
        </p>
        <div className="flex-row gap-1rem">
          <Link
            to={`/${ROUTES.ABOUT_COLLECTION}`}
            className="sam-button primary"
          >
            Leer más
          </Link>
          <Link to={`/${ROUTES.COLLECTION}`} className="sam-button secondary">
            Ver colección
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
