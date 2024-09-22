import TextField from "../../../../components/ui/TextField";
import HeaderPage from "../../../../components/ui/HeaderPage";
export default function MorphometricMeasuresForm() {
  return (
    <div className="form-section flex-col gap-2rem input-group">
      <TextField label={"Largo total"} type="number" step={0.1}></TextField>
      <TextField
        label={"Largo de la oreja"}
        type="number"
        step={0.1}
      ></TextField>
      <TextField
        label={"Largo de la pata"}
        type="number"
        step={0.1}
      ></TextField>
      <TextField
        label={"Largo dse la cola"}
        type="number"
        step={0.1}
      ></TextField>
      <TextField label={"Peso"} type="number" step={0.1}></TextField>
    </div>
  );
}
