import TextField from "../../../components/ui/TextField";
import Button from "../../../components/ui/Button";

export default function TehnicalPersonForm() {
  return (
    <div className="input-group">
      <TextField label="Nombre(s)" required></TextField>
      <TextField label="Apellido paterno" required></TextField>
      <TextField label="Apellido materno" required></TextField>
      <TextField label={"Puesto"}></TextField>
      <br />

      <TextField
        required
        label={"Email"}
        maxLength={20}
        helperText="El sistema enviara un mensaje a la dirección que usted proporcione, incluyendo una contraseña provicional que permita al nuevo técnico iniciar sesión."
      ></TextField>

      <div className="button-row">
        <Button>Agregar técnico</Button>
      </div>
    </div>
  );
}
