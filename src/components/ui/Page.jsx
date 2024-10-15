import Card from "./Card.jsx";
import Footer from "./Footer.jsx";
import HeaderPage from "./HeaderPage.jsx";
export default function Page({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <HeaderPage
        title="Regístrese"
        subtitle={
          "Le agradecemos su paciencia. Antes de acceder a la colección, le pedimos que ingrese algunos datos personales a continuación. Todos los campos son necesarios."
        }
      ></HeaderPage>

      <div
        className="flex-col page-padding"
        autoComplete="off"
        style={{
          flexGrow: 1,
        }}
      >
        <br />
        <br />
        <Card className={"flex-col gap-2rem"}>{children}</Card>
      </div>
      <Footer></Footer>
    </div>
  );
}
