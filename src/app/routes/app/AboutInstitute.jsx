import Page from "../../../components/ui/Page"
import { Link } from "react-router-dom"

export default function AboutInstitute(){
    return (
        <Page
            title={"Instituto de Investigaciones Biológicas"}
        >
            <p>
                El Instituto de Investigaciones Biológicas de la Universidad Veracruzana es una 
                entidad orientada al estudio de los procesos biológicos, en sus distintos niveles de 
                organización. Realiza funciones de Investigación, docencia y vinculación. El personal 
                académico adscrito en el 2021 al instituto se integra por 19 investigadores y 2 Técnicos 
                académicos que cultivan 23 líneas de investigación individual organizados en siete áreas de 
                investigación. Cuenta con tres cuerpos académicos propios y sus investigadores participan 
                además en cuerpos académicos y redes de investigación en otras entidades de educación 
                superior. En la parte administrativa son doce las personas que se dedican a las diversas tareas 
                de carácter administrativo, manual o de apoyo académico, actividades que permiten la 
                planificación, organización, gestión, operación, y que también han contribuido con su trabajo 
                cotidiano al desarrollo del instituto.
                <br></br>
                <br></br>
                Actualmente la diversidad de Proyectos de investigación que se desarrollan en el Instituto 
                aún abarca una gama amplia de líneas y enfoques de investigación en: Biología de la 
                reproducción; Biología Integrativa; Biología molecular; Biología sistémica; Biomedicina; 
                Botánica; Comportamiento; Conservación; Ecología; Ecología profunda; Enfoques 
                sistémicos en investigación biomédica; Estudios Florísticos y Faunísticos; Filosofía de la 
                Ciencia; Fisiología; Micro anatomía; Sistemática y Zoología.
            </p>
            <h2 className="margin-0">Objetivos del instituto</h2>
            
            <ul>
                <li>
                    Proponer y ejecutar proyectos específicos de investigación básica y aplicada en 
                    algunas de las especies de mamíferos silvestres de Veracruz.
                </li>
                <li>
                    Difundir y divulgar la investigación científica generada por los proyectos de 
                    investigación.
                </li>
                <li>
                    Utilizar o implementar las herramientas informáticas necesarias para facilitar la 
                    obtención y manejo de información de vanguardia.
                </li>
                <li>
                    Apoyar a la formación profesional de estudiantes en el campo de mastozoología y el 
                    comportamiento de los mamíferos.
                </li>
            </ul>
        
        </Page>
    )
}