import { useNavigate } from "react-router-dom";
import Searchbar from "../../../components/ui/Searchbar";
import Footer from "../../../components/ui/Footer";
import Button from "../../../components/ui/Button";
import ROUTES from "../../../stores/routes";
function SearchBanner({ children }) {  
  const imageUrl = `src/assets/images/${Math.floor(Math.random() * 6)}.webp`;


  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "bg-gradient"
      }}
      className="landing-search color-white"
    >
      {children}
    </div>
  );
}

export default function Landing({ species, children }) {
  const navigate = useNavigate();

  return (
      <div>
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
                    src={"src/assets/images/LOGO_LAB.png"}
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
          style={{
            height: "20rem"
            
          }}
          className="page-padding p-2rem gap-2rem"
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
          <div className="flex-row gap-1rem">

          <Button>Leer más</Button>
          <Button 
            className="secondary" 
            iconType="pets"
            onClick={() => navigate(ROUTES.COLLECTION)}
          >
            Ver colección
          </Button>
          </div>
          </p>
        </div>
      <Footer></Footer>
      </div>

  );
}
