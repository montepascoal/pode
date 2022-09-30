import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  width: 25%;
  height: auto;
  margin: 15px;
  padding: 0;
  display: block;
  overflow: hidden;
  border-collapse: separate;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3125);
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3125);
  border-radius: 3px;
  -webkit-border-radius: 3px;

  &:after {
    clear: both;
    content: "";
    display: block;
    font-size: 0;
    visibility: hidden;
  }

  ${media.lessThan("1023px")`
    width: 100%;
  `}
`;

export const CalendarNavi = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: table;
  border-spacing: 0;
  border-collapse: separate;
  background-color: var(--primary);
  border-radius: 3px 3px 0 0;
  -webkit-border-radius: 3px 3px 0 0;
`;

export const ButtonPrev = styled.span`
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC\
    9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgNiAxNiI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iT\
    TYgMkwwIDhsNiA2VjJ6Ii8+PC9zdmc+");
`;

export const ButtonNext = styled.span`
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC\
    9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgNiAxNiI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iT\
    TAgMTRsNi02LTYtNnYxMnoiLz48L3N2Zz4=");
`;

export const CalendarLabel = styled.span`
  cursor: pointer;
  color: #fff;
  margin: 0;
  padding: 0;
  display: table-cell;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.15);
  background-repeat: no-repeat;
  background-position: center center;

  &:first-child {
    width: 35px;
    padding: 0 0 5px 0;
    font-size: 22px;
  }

  &:last-child {
    width: 35px;
    padding: 0 0 5px 0;
    font-size: 22px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const CalendarDate = styled.div`
  margin: 0;
  padding: 0 10px;
  display: block;
  
  table {
    width: 100%;
    margin: 0;
    padding: 0;
    border-spacing: 0;
    border-collapse: collapse;

    thead tr > *,
    tbody tr > * {
      width: 35px;
      height: 35px;
      padding: 0;
      font-size: 12px;
      text-align: center;
      font-weight: normal;
      line-height: 35px;
      border: 0;
    }

    tbody tr > * > span {
      color: inherit;
      z-index: 10;
      position: relative;
    }

    tbody tr > *::after {
      top: 3px;
      left: 3px;
      width: 29px;
      height: 29px;
      content: "";
      display: block;
      position: absolute;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      border-radius: 50%;
      -webkit-border-radius: 50%;
    }
  }
`;

export const TableCalendarMonth = styled.table`
  tbody tr > * {
    width: 81.66666666666667px;
    padding: 5px;
    line-height: 25px;
  }

  tbody tr > * span {
    display: block;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 3px;
    -webkit-border-radius: 3px;
  }

  tbody
  tr
  > *:hover span {
    border-color: #d0d0d0;
    box-shadow: 0 1px 0 0 #efefef;
    -webkit-box-shadow: 0 1px 0 0 #efefef;
  }
`;

export const TDCalendarMonth = styled.td`
  tbody tr > * {
    width: 81.66666666666667px;
    padding: 5px;
    line-height: 25px;
  }
`;

export const TDCalendarDayEmpty = styled.td`
  color: #8899aa;
  cursor: not-allowed;
  background-color: #efefef;

  &:hover:after {
    content: "";
    display: none;
  }
`;

export const TDCalendarToday = styled.td`
  color: ${({isToday}) => (isToday) ? "var(--white)" : "" };
  background: ${({isToday}) => (isToday) ? "var(--primary)" : "" };
  border-radius: 5px;

  &:after {
    border-color: ${({isToday}) => (isToday) ? "var(--primary)" : "" };;
  }
`;

export const Date = styled.span`
  display: block;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-radius: 3px;
  -webkit-border-radius: 3px;
`;