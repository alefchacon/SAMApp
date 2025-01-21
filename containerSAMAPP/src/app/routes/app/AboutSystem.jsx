import Page from "../../../components/ui/Page"
import { Link } from "react-router-dom"

export default function AboutSystem(){
    return (
        <Page
            title={"Sistema de Administración Mastozoológica"}
        >
            <p>
                El Sistema de Administración Mastozoológica (SAM) es una plataforma web desarrollada para la supervisión de la <Link> Colección de Mamíferos </Link> 
                del <Link>Instituto de Investigaciones Biológicas</Link>.
                
                SAM es desarrollado en la Facultad de Estadística e Informática de Xalapa, Veracruz, México. El sistema es producto
                de los esfuerzos de múltiples estudiantes y el ejercimiento de sus habilidades en las subdisciplinas que comprenden a la Ingeniería de Software.
            </p>
            <h2>Desarrolladores</h2>
            <p>
                SAM ha sido desarrollado a lo largo de varios años. 
                Inició en 2015 con el trabajo recepcional titulado “Desarrollo de un prototipo para la colección de mamíferos 
                del Instituto de Investigaciones biológicas de la UV” de Fabiola 
                Vásquez Ventura, trabajo en el cual se buscaba mejorar el intercambio de 
                información entre los colaboradores, resultando en una Especificación de Requisitos
                que es la base en cualquier proyecto de desarrollo de una aplicación.
                <br></br>
                <br></br>
                Miguel Alejandro Cámara Árciga desarrolló el <Link to={"https://alex-camara.github.io/PROGEFI/" }  target="_blank" rel="noopener noreferrer">
                 Programa Generador de Fichas para Colecciones Científicas de Fotocolectas (PROGEFI)
                </Link>, herramienta de software para registrar imágenes que aporten algún avistamiento
                sobre una especie de fauna determinada, como parte de su trabajo recepcional titulado 
                "Desarrollo de una aplicación de escritorio para la generación y gestión de fichas de fotocolecta",
                publicado en el 2020.
                <br></br>
                <br></br>
                Karina Valdés Iglesias diseñó y programó la API que almacena los datos de la biocolección,
                incluyendo las fichas generadas por el programa de Cámara, en su trabajo recepcional "Sistema de Administración de colecciones
                de biodiversidad: Colección de Mamíferos del IIB-UV", utilizando la Especificación de Requisitos de Vásquez. La API se desarrolló
                en el 2023.
                <br></br>
                <br></br>
                Alejandro Chacón Fernández diseñó y construyó la aplicación web de SAM como parte de su servicio social en 2024,
                para permitir el uso de la API construida por Valdés al público en general.
            </p>
        </Page>
    )
}