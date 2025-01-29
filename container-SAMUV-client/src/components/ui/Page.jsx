import Card from "./Card.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
export default function Page({ children, title, subtitle, disableShadow }) {
  return (
    <div className="flex-col flex-grow-1">
      <Header title={title} subtitle={subtitle}></Header>
      <div
        className="flex-col page-padding flex-grow-1"
        autoComplete="off"
      >
        <br />
        <br />
        {disableShadow 
          ? <div className={"flex-col gap-2rem p-2rem"}>{children}</div> 
          : <Card className={"flex-col gap-2rem p-2rem"}>{children}</Card>
        }
      </div>
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
}
