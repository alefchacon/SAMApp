import { useNavigate } from "react-router-dom";
import Searchbar from "../../../components/ui/Searchbar";
import Footer from "../../../components/ui/Footer";
import Button from "../../../components/ui/Button";
import ROUTES from "../../../stores/routes";
function SearchBanner({ children }) {  
  return (
    <div
      style={{
        //backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "bg-gradient"
      }}
      className="landing-search bg-gradient color-white"
    >
      {children}
    </div>
  );
}

export default function Landing({ species, children }) {
  const navigate = useNavigate();

  return (
      <div className="flex-col h-100">
        <SearchBanner>
          <div className="flex-row gap-1rem">
            <img 
              style={{
                height: '17vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              src={"src/assets/images/LOGO_LAB.png"}
              alt="Logo del Laboratorio de Vertebrados" />
            <div>

            <h2 className="landing-system-name">
              Biocolección de mamíferos del
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
          style={{
            height: "20rem"
            
          }}
          className="page-padding p-2rem gap-2rem"
        >
          <h2>
            Sobre la biocolección de mamíferos
          </h2>
          <p>
          La colección de mamíferos es proveer un espacio de custodia 
          de ejemplares de los mamíferos silvestres del estado de Veracruz. Con el fin de documentar 
          su diversidad, distribución, abundancia, información científica y empírica generada que 
          promueva los estudios de sistemática biológica como aquellos de índole ecológica. 
          Permitiendo la conservación y manejo de los mamíferos silvestres y de sus sistemas 
          ecológicos.
          <br/>
          <br/>
          <div className="flex-row gap-1rem">

          <Button>Leer más</Button>
          <Button 
            className="secondary" 
            iconType="pets"
            onClick={() => navigate(ROUTES.COLLECTION)}
          >
            Ver biocolección
          </Button>
          </div>
          </p>
        </div>
      <Footer></Footer>
      </div>

  );
}
