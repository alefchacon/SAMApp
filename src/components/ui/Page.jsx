import Card from "./Card.jsx";
import Footer from "./Footer.jsx";
import HeaderPage from "./HeaderPage.jsx";
export default function Page({ children, title, subtitle }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <HeaderPage title={title} subtitle={subtitle}></HeaderPage>
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
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
}
