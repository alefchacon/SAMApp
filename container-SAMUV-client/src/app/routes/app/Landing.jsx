import Searchbar from "../../../components/ui/Searchbar";
import Footer from "../../../components/ui/Footer";
import ROUTES from "../../../routing/frontendRoutes";
import { Link } from "react-router-dom";
function SearchBanner({ children }) {  
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="landing-search bg-gradient flex-1 color-white justify-content-center"
    >
      {children}
    </div>
  );
}

export default function Landing({ species, children }) {

  return (
      <div className="h-100 flex-col">
        <SearchBanner>
          <div className="flex-row gap-1rem align-items-center margin-0">
              <div className="logo-container position-relative flex-row justify-content-center align-items-center">
                  <div className="logo-bg bg-white position-relative"></div>
                  <img 
                    className="logo position-absolute" 
                    style={{
                      height: '17vh',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    src={"/LOGO_LAB.png"}
                    alt="Logo del Laboratorio de Vertebrados" 
                  />
              </div>
            <div>
              <h2 className="landing-system-name">
                Colección de mamíferos del
                Instituto de Investigaciones Biológicas
                <br />
                de la Universidad Veracruzana
              </h2>
              <h1 className="landing-tag">
                Acceso abierto a los mamíferos veracruzanos
              </h1>
            </div>
          </div>
          <br/>
          <Searchbar></Searchbar>
          {children}
        </SearchBanner>
        
        <div
          className="page-padding p-2rem gap-2rem flex-col"
        >
          <h2>
            Sobre la colección de mamíferos
          </h2>
          <p>
            La colección de mamíferos provee un espacio de custodia 
            de ejemplares de los mamíferos silvestres del estado de Veracruz, con el fin de documentar 
            su diversidad, distribución, abundancia, información científica y empírica generada que 
            promueva los estudios de sistemática biológica como aquellos de índole ecológica, permitiendo así la conservación y manejo de los mamíferos silvestres y de sus sistemas 
            ecológicos.
          <br/>
          <br/>
          </p>
          <div className="flex-row gap-1rem">
          <Link to={`/${ROUTES.ABOUT_COLLECTION}`} className="sam-button primary">Leer más</Link>
          <Link to={`/${ROUTES.COLLECTION}`} className="sam-button secondary">Ver colección</Link>
          </div>
        </div>
      <Footer></Footer>
      </div>

  );
}
