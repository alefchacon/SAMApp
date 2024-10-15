import Page from "../../../components/ui/Page";
import TextField from "../../../components/ui/TextField";
import Button from "../../../components/ui/Button";

export default function SignupForm() {
  return (
    <div className="flex-row w-100 ">
      <div style={{ backgroundColor: "red", flex: 4 }}>asdf</div>
      <div
        style={{ flex: 2, padding: "7rem" }}
        className="p-1rem rounded-20 justify-content-center align-items-center"
      >
        <br />
        <br />
        <h1>Bienvenido!</h1>
        <br />
        <br />
        <TextField iconType={"person"}></TextField>
        <TextField iconType={"key"} type="password"></TextField>
        <br />
        <br />
        <Button iconType="login" className="primary fullwidth">
          Entrar
        </Button>
        <br />
        <Button iconType="send" className="secondary fullwidth">
          Solicitar acceso
        </Button>
      </div>
    </div>
  );
}
