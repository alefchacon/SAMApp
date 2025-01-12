import Page from "../../../components/ui/Page"
import { Link } from "react-router-dom"
import ROUTES from "../../../stores/routes"

export default function AboutCollection(){
    return (
        <Page
            title={"Colección de Mamíferos"}
        >
            <p>
                En el Área de Zoología del <Link to={ROUTES.ABOUT_INSTITUTE}>Instituto de Investigaciones Biológicas</Link> se llevan a cabo principalmente estudios de campo sobre mamíferos 
                y otros vertebrados terrestres, con énfasis en ecología, sistemática, conservación, 
                biogeografía, manejo y comportamiento de mamíferos, entre otros. El área alberga un 
                laboratorio de zoología, que a su vez contiene la Colección de Mamíferos con registro oficial 
                ante SEMARNAT (VER. -MAM-191-10-06). El acervo de la colección agrupa a los 
                ejemplares de 11 Ordenes, 29 familias, 116 géneros y 188 especies con un total de 4,500 
                ejemplares de mamíferos depositados, lo que la constituye como <b>una de las cinco colecciones </b>
                más importantes de México.
            </p>
            <h2 className="margin-0">Historia</h2>
            <p>
                En 1985, gracias al apoyo de la Universidad Veracruzana, se creó el área de Zoología 
                mediante el programa “Estudios florísticos y faunísticos en la sierra de Santa Martha (estado 
                de Veracruz, México), proyecto de una zona de reserva ecológica", en convenio con el 
                Programa Nacional de Apoyo a la Educación Superior (PRONAES). Posteriormente, en 
                enero de 1986, la Dirección General de Investigación Científica y Superación Académica 
                (DGICSA) apoyó dos proyectos: 
                <ol>
                    <li>
                        "Autoecología de la nutria Lontra longicaudis y posibilidades de domesticación"
                    </li>
                    <li>
                        "Distribución y abundancia de los mamíferos de Santa 
                        Martha Veracruz"
                    </li>
                </ol>
                Con estos proyectos se iniciaron las actividades que darían origen a la 
                colección de mamíferos. Las primeras colectas de campo que se hicieron se depositaron 
                dentro del acervo de la colección mastozoológica de la Universidad Autónoma 
                Metropolitana-Iztapalapa; sin embargo, pronto se vio la conveniencia de conservar en el 
                Centro de Investigaciones Biológicas de la Universidad Veracruzana el material biológico 
                para su revisión y estudio.
                <br></br>
                <br></br>
                El material mastozoológico del estado de Veracruz requirió contar con un espacio 
                para su estudio, almacenamiento y su mantenimiento adecuado. Pronto se asignó un espacio 
                y se adquirió un mueble mastozoológico para la colección que gradualmente se ha 
                consolidado. Apoyados en la entusiasta colaboración de alumnos de la Facultad de Biología, 
                la colección ha crecido constantemente, por lo que en la actualidad ya tiene representado
                <b> alrededor de 74% de los mamíferos silvestres reportados para el estado de Veracruz</b> 
            </p>
        </Page>
    )
}