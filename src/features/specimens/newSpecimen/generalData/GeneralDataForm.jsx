import TextField from "../../../../components/ui/TextField";
import TextArea from "../../../../components/ui/TextArea";
import HeaderPage from "../../../../components/ui/HeaderPage";
export default function GeneralDataForm({ children }) {
  return (
    <div className="form-section flex-col gap-2rem input-group">
      <TextField label={"Número de preparación"}></TextField>
      <TextField label={"ID del catálogo"}></TextField>
      <TextField label={"Código del colector"}></TextField>
      <TextField label={"Fecha de la colecta"} type="date"></TextField>
      <TextField label={"Hora de la colecta"} type="time"></TextField>

      <fieldset className="rounded-20 flex-col gap-05rem">
        <legend className="input-label">Estado del especímen</legend>
        <div className="option">
          <input
            type="radio"
            id="statusChoice1"
            name="status"
            value="publicado"
          />
          <label htmlFor="statusChoice1" style={{ cursor: "pointer" }}>
            Publicado
          </label>
        </div>

        <div className="option">
          <input
            type="radio"
            id="statusChoice2"
            name="status"
            value="daniado"
          />
          <label htmlFor="statusChoice2">Dañado</label>
        </div>
      </fieldset>
      <fieldset className="rounded-20">
        <legend className="input-label">Sexo</legend>
        <div className="option">
          <input type="radio" id="sexChoice1" name="sex" value="macho" />
          <label htmlFor="sexChoice1">Macho</label>
        </div>

        <div className="option">
          <input type="radio" id="sexChoice2" name="sex" value="hembra" />
          <label htmlFor="sexChoice2">Hembra</label>
        </div>
        <br />
      </fieldset>
      <TextField label={"Número de embriones"} type="number"></TextField>
      <TextArea label={"Observaciones"} maxLength={200}></TextArea>
    </div>
  );
}
