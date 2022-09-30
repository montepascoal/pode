import styled, { css } from "styled-components";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import { ReactTabulator } from "react-tabulator";
import media from "styled-query";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.15rem 1.75rem 0 rgb(58 59 69 / 15%);
  border: 1px solid #ccc;
  padding: 1.25rem;
  border-radius: 5px;
`;

export const Export = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  button {
    padding: 5px 30px;
    font-size: 12px;
    margin: 0;
  }

  ${media.lessThan("767px")`
    justify-content: center;
  `}
`;

export const LabelExport = styled.label`
  margin: 0 5px 15px 0;
  font-weight: bold;
  color: #2b2c2e;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 7px;
  color: var(--primary);

  transition: 0.3s;

  ${media.lessThan("767px")`
    font-size: 13px;
  `}

  &:hover {
    filter: brightness(1.2);
  }
`;

export const ExportCloseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  pointer-events: ${({ isActive }) => (isActive ? "auto" : "none")};
  z-index: 100;
`;

export const ExportTooltip = styled.div`
  position: absolute;
  top: 60%;
  right: 0;
  background: var(--white);
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  z-index: 150;

  ${media.lessThan("767px")`
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
  `}

  ${({ isActive }) =>
    isActive &&
    css`
      top: 80%;
      opacity: 1;
      pointer-events: auto;
    `}
`;

export const Table = styled(ReactTabulator)`
  border: none;
  background-color: transparent;

  .tabulator-header {
    background-color: var(--white);
    border: none;
  }

  .tabulator-header .tabulator-col {
    background-color: var(--white);
    border: none;
  }

  .tabulator-header .tabulator-col.tabulator-sortable {
    &:hover {
      background-color: var(--white);
    }
  }

  .tabulator-col[tabulator-field="comStatus"] .tabulator-header-filter {
    display: none !important;
  }

  .tabulator-row {
    background-color: var(--white);

    &:hover {
      background-color: #cccccc52;
    }
  }

  .tabulator-cell {
    height: 31px;
    padding: 0.3rem;
    color: #333;
    border-right: none;
    font-size: 14px;
  }

  .tabulator-footer {
    background: #00000014;
    border: none;
    border-radius: 10px;
  }

  .tabulator-footer .tabulator-page.active {
    background: var(--primary);
    color: var(--white);
  }

  .tabulator-tableholder {
    &::-webkit-scrollbar {
      height: 7px;
    }
  }

  ${media.lessThan("767px")`
    div[tabulator-field="comConPhone1"],
    div[tabulator-field="comConEmail"] {
      display: none !important;
    }

    .tabulator-col[tabulator-field="comStatus"],
    .tabulator-cell[tabulator-field="comStatus"] {
      width: 15% !important;
    }

    .tabulator-col[tabulator-field="comName"],
    .tabulator-cell[tabulator-field="comName"] {
      width: 55% !important;
    }

    .tabulator-col[tabulator-field="comCnpj"],
    .tabulator-cell[tabulator-field="comCnpj"] {
      width: 30% !important;
    }

    .tabulator-table {
      width: 100%;
    }
  `}

  input {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #6e707e;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d1d3e2;
    border-radius: 0.35rem;
  }
`;

export const RowContainer = styled.div`
  padding-top: 4px;
`;

export const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;
