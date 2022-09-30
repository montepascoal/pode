import styled from "styled-components";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "var(--success)";
  }
  if (props.isDragReject) {
    return "var(--error)";
  }
  if (props.isFocused) {
    return "var(--primary)";
  }
  return props.hasFile ? "var(--primary)" : "var(--text_3)";
};

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  > button {
    align-self: flex-end;
    margin-top: 2rem;
  }
`;

export const DropZone = styled.div`
  margin-top: 1rem;
  width: 100%;
  padding: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  border: 2px dashed #cfcfcf;
  border-color: ${(props) => getColor(props)};
  transition: 0.5s;
  cursor: pointer;

  p {
    color: ${(props) => getColor(props)};
  }
`;
