import Button from "../Button";
import { Container } from "./styles";

export function ConfirmDelete({ description, deleteId, onCancel, onConfirm }) {
  return (
    <Container>
      <p>{description}</p>
      <section>
        <Button text="Cancelar" color="red" action={onCancel} />
        <Button text="Confirmar" color="success" action={() => onConfirm(deleteId)} />
      </section>
    </Container>
  )
}