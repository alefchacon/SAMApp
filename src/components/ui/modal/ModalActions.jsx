import Button from "../Button";
export default function ModalActions({
  open,
  onSecondaryClick,
  onPrimaryClick,
  onSubmit,
}) {
  return (
    <div className="form-actions">
      <Button className="secondary" iconType="close" onClick={onSecondaryClick}>
        Cancelar
      </Button>
      <Button
        className="primary"
        label="Registrar colaborador"
        onClick={onSubmit}
      >
        Registrar colaborador
      </Button>
    </div>
  );
}
