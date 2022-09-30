import React, { useState, useEffect } from 'react';

import { 
  format, 
  addDays, 
  addYears, 
  startOfWeek, 
  getDaysInMonth, 
  startOfMonth, 
  setMonth, 
  setYear 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import * as S from './styles';

export default function Calendar () {

  const [showYearTable, setShowYear]   = useState(false);
  const [showMonthTable, setShowMonth] = useState(false);
  const [showDateTable, setShowDate]   = useState(true);
  const [dateObject, setDateObject]    = useState(new Date());
  const [allMonths, setAllMonths]      = useState([]);
  const [weekDayShort, setWeekDay]     = useState([]);

  useEffect(() => {
    for (let i = 0; i < 12; i++) { 
      setAllMonths(oldArray => [...oldArray, ptBR.localize.month(i, { width: 'full' })] );
    }

    setWeekDay(
      Array.from(Array(7)).map((e, i) => format(
          addDays(
            startOfWeek(dateObject), i
          ), 'EEEEEE', { locale: ptBR }
        )
      )
    );
  }, [dateObject]);

  const daysInMonth = () => {
    return getDaysInMonth(dateObject);
  };

  const year = () => {
    return format(dateObject, "Y");
  };

  const currentDay = () => {
    return parseInt(format(dateObject, "d"));
  };

  const firstDayOfMonth = () => {
    let firstDay = format(startOfMonth(dateObject), "d");

    return firstDay;
  };
  
  const month = () => {
    return format(dateObject, "MMMM", { locale: ptBR });
  };

  const showMonth = (e, month) => {
    setShowMonth(!showMonthTable);
    setShowDate(!showDateTable);
  };

  const setMonthCalendar = month => {
    let monthNo = allMonths.indexOf(month);

    setDateObject(setMonth(dateObject, parseInt(monthNo)));
    setShowMonth(!showMonthTable);
    setShowDate(!showDateTable);
  };

  const MonthList = props => {
    let months = [];
    let rows   = [];
    let cells  = [];

    props.data.map((data) => {
      return months.push(
        <S.TDCalendarMonth
        key={data}
        onClick={e => {
          setMonthCalendar(data);
        }}
        >
          <S.Date>{data}</S.Date>
        </S.TDCalendarMonth>
      );
    });

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });

    rows.push(cells);

    let monthlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <S.TableCalendarMonth>
        <thead>
          <tr>
            <th colSpan="4">Selecione o Mês</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </S.TableCalendarMonth>
    );
  };

  const showYear = e => {
    setShowYear(!showYearTable);
    setShowDate(!showDateTable);
  };

  const onPrev = () => {
    let curr = "";

    if (showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }

    setDateObject(dateObject.subtract(1, curr));
  };

  const onNext = () => {
    let curr = "";

    if (showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }

    setDateObject(dateObject.add(1, curr));
  };

  const setYearCalendar = year => {
    setDateObject(setYear(dateObject, year));
    setShowMonth(!showMonthTable);
    setShowYear(!showYearTable);
  };

  const getDates = (startDate, stopDate) => {
    const dateArray = [];
    let currentDate = startDate;

    while (currentDate <= stopDate) {
      dateArray.push(format(currentDate, "yyyy"));
      currentDate = addYears(currentDate, 1);
    }

    return dateArray;
  }

  const YearTable = props => {
    let months  = [];
    let nextten = addYears(new Date(), 12);
    let tenyear = getDates(new Date(), nextten);

    let rows  = [];
    let cells = [];

    tenyear.map((data) => {
      return months.push(
        <S.TDCalendarMonth
          key={data}
          onClick={e => {
            setYearCalendar(data);
          }}
        >
          <S.Date>{data}</S.Date>
        </S.TDCalendarMonth>
      );
    });
    
    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });

    rows.push(cells);

    let yearlist = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });

    return (
      <S.TableCalendarMonth>
        <thead>
          <tr>
            <th colSpan="4">Selecione o Ano</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </S.TableCalendarMonth>
    );
  };

  let weekDayShortName = weekDayShort.map(day => {
    return <th key={day}>{day}</th>;
  });

  let blanks = [];

  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<S.TDCalendarDayEmpty key={i}>{""}</S.TDCalendarDayEmpty>);
  }

  let daysInMonthArr = [];

  for (let d = 1; d <= daysInMonth(); d++) {
    let dayCurrent = d === currentDay();

    daysInMonthArr.push(
      <S.TDCalendarToday key={d} isToday={dayCurrent}>
        <span>
          {d}
        </span>
      </S.TDCalendarToday>
    );
  }

  const totalSlots = [...blanks, ...daysInMonthArr];
  let rows  = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  let daysinmonth = rows.map((d, i) => {
    return <tr key={i}>{d}</tr>;
  });

  return (
    <S.Container>
        <S.CalendarNavi>
          <S.ButtonPrev onClick={e => { onPrev(); }} />

          {!showMonthTable && (
            <S.CalendarLabel onClick={e => {
                showMonth();
              }}
            >
              {month()}
            </S.CalendarLabel>
          )}

          <S.CalendarLabel onClick={e => showYear()}>
            {year()}
          </S.CalendarLabel>

          <S.ButtonNext onClick={e => { onNext(); }} />
        </S.CalendarNavi>
       
        <S.CalendarDate>
          {showYearTable && !showMonthTable && <YearTable props={year()} />}
          {showMonthTable && !showYearTable && (
            <MonthList data={allMonths} />
          )}
        </S.CalendarDate>

        {showDateTable && (
          <S.CalendarDate>
            <table>
              <thead>
                <tr>{weekDayShortName}</tr>
              </thead>
              <tbody>{daysinmonth}</tbody>
            </table>
          </S.CalendarDate>
        )}
    </S.Container>
  );
}