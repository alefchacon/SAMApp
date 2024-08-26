import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import Tabs from "../../components/ui/Tabs";

function Credentials() {
  return (
    <>
      <TextField
        id="email"
        label={"Correo electrónico"}
        iconType={"mail"}
        placeholder={"jperez@uv.mx"}
        required
        fullwidth
      ></TextField>
      <TextField
        id="password"
        iconType={"key"}
        label={"Contraseña"}
        type="password"
        required
        fullwidth
      ></TextField>
    </>
  );
}

export default function LogInForm() {
  return (
    <Tabs className={"divider"}>
      <div className="flex-col" label="Entrar">
        <div className="flex-col p-2rem gap-1rem">
          <Credentials />
          <Button iconType="login">Entrar</Button>
        </div>
      </div>
      <div label="Solicitar acceso">
        <div className="flex-col p-2rem gap-1rem divider">
          <h3>Datos personales</h3>
          <p>
            Cuéntenos un poco sobre usted y lo que lo motiva a solicitar acceso.
          </p>
          <div className="row-col gap-1rem">
            <textarea id="about" className="input" maxLength={500}></textarea>
            <br />
            <br />

            <TextField
              id="orcid"
              label={"ORCID"}
              helperText={"Sólo ingrese los números"}
              placeholder={"0009-0006-6970-4606"}
              required
              fullwidth
              customIcon={
                <img
                  width="25"
                  alt="ORCID iD"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/ORCID_iD.svg/512px-ORCID_iD.svg.png?20190308043226"
                />
              }
            ></TextField>
          </div>
        </div>
        <div className="flex-col p-2rem gap-1rem divider">
          <h3>Credenciales</h3>
          <p>Esta será la información que utilizará para entrar al sistema.</p>
          <Credentials />
          <Button iconType="send">Enviar solicitud</Button>
        </div>
      </div>
    </Tabs>
  );
}
