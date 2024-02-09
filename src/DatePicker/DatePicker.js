import { useEffect, useState } from "react";
import {
  dateInBetween,
  daysInMonth,
  formatDate,
  formatDateInMonth,
  isDatesAreEqual,
} from "./utils";
import "./DatePicker.scss";

export const DatePicker = ({ changeHandler }) => {
  const [monthRange, setMonthRange] = useState({
    from: new Date(
      `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`
    ),
    to: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 2}-01`),
  });
  const [selected, setSelected] = useState({
    date1: undefined,
    date2: undefined,
  });
  const [modalStyle, setModalStyle] = useState({ display: "none" });

  const _setMonthRange = (offset, key) => {
    let otherKey = key == "to" ? "from" : "to";
    let _monthRange = structuredClone(monthRange);
    let newRange = {
      ...monthRange,
      [key]: new Date(
        _monthRange[key].setMonth(_monthRange[key].getMonth() + offset)
      ),
    };
    if (
      newRange.from.getMonth() == newRange.to.getMonth() &&
      newRange.from.getFullYear() == newRange.to.getFullYear()
    ) {
      newRange[otherKey] = new Date(
        _monthRange[otherKey].setMonth(
          _monthRange[otherKey].getMonth() + offset
        )
      );
    }
    setMonthRange(newRange);
  };

  const _setSelected = (date) => {
    if (selected.date1 && !selected.date2) {
      setSelected({ ...selected, date2: date });
    } else {
      setSelected({ date1: date, date2: undefined });
    }
  };
  const setHoveredDate = (date) => {
    if (selected.date1 && !selected.date2)
      setSelected({ ...selected, hovered: date });
  };

  const dateRangeText = ({ date1 = new Date(), date2 = new Date() }) => {
    let { from, to } =
      date2 > date1 ? { from: date1, to: date2 } : { from: date2, to: date1 };
    return `${formatDate(from)} ~ ${formatDate(to)}`;
  };

  const closeModal = () => {
    setModalStyle({
      display: "none",
    });
  };

  const setRange = (days) => {
    setSelected({
      date1: new Date(),
      date2: new Date(new Date().setDate(new Date().getDate() - 1 * days)),
    });
  };

  const saveDates = () => {
    let { date1, date2 } = selected;
    let range = date2 > date1 ? [date1, date2] : [date2, date1];

    const diffInMs =
      new Date(range[1]).getTime() - new Date(range[0]).getTime();

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    let weekendDates = Array.from(
      { length: diffInDays },
      (i, k) =>
        new Date(
          structuredClone(range[0]).setDate(
            structuredClone(range[0]).getDate() + k
          )
        )
    ).filter((i) => [0, 6].includes(i.getDay()));
    changeHandler([
      range.map((i) => formatDate(i)),
      weekendDates.map((i) => formatDate(i)),
    ]);
    closeModal();
  };

  return (
    <div>
      <div
        className="date-input"
        onClick={(e) => {
          setModalStyle({
            display: modalStyle.display == "none" ? "block" : "none",
            position: "fixed",
            top: e.target.offsetTop + e.target.clientHeight + 1,
            left: e.target.offsetLeft,
          });
        }}
      >
        {dateRangeText(selected)}
      </div>

      <div className="modal" style={modalStyle}>
        <div className="calendar-top">
          <CalendarView
            selected={selected}
            _setSelected={_setSelected}
            setHoveredDate={setHoveredDate}
            _setMonthRange={_setMonthRange}
            monthRange={monthRange}
            param={"from"}
          />
          <CalendarView
            selected={selected}
            _setSelected={_setSelected}
            setHoveredDate={setHoveredDate}
            _setMonthRange={_setMonthRange}
            monthRange={monthRange}
            param={"to"}
          />
        </div>
        <div className="actions">
          <div className="left">
            <button onClick={() => setRange(7)}>last 7 days</button>
            <button onClick={() => setRange(30)}>last 30 days</button>
          </div>
          <button
            className={`primary ${
              (!selected.date1 || !selected.date2) && "disabled"
            }`}
            disabled={!selected.date1 || !selected.date2}
            onClick={saveDates}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const CalendarView = ({
  selected,
  _setSelected,
  param,
  setHoveredDate,
  _setMonthRange,
  monthRange,
}) => {
  const [dates, setDates] = useState([]);
  let date = monthRange[param];
  let _date = structuredClone(date);

  useEffect(() => {
    let _dates = Array.from(
      { length: daysInMonth(_date) },
      (i, k) => new Date(_date.setDate(k + 1))
    );

    let _start = structuredClone(_dates[0]);

    let _end = structuredClone(_dates.at(-1));

    let leftDates = Array.from(
      { length: _start.getDay() },
      (i, k) => new Date(_start.setDate(_start.getDate() - 1))
    ).reverse();

    let rightDates = Array.from(
      { length: 14 },
      (i, k) => new Date(_end.setDate(_end.getDate() + 1))
    );

    setDates([...leftDates, ..._dates, ...rightDates].slice(0, 42));
  }, [date]);

  return (
    <div className="calendar-view">
      <div className="month-changer">
        <button onClick={() => _setMonthRange(-1, param)}>{"<"}</button>
        <span>{formatDateInMonth(monthRange[param])}</span>
        <button onClick={() => _setMonthRange(1, param)}>{">"}</button>
      </div>
      <div className="datesWrapper">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((i) => (
          <div className="weekday" key={i}>
            {i}
          </div>
        ))}
        {dates.map((i, k) => (
          <div key={k}>
            <div
              onClick={() => _setSelected(i)}
              onMouseEnter={() => setHoveredDate(i)}
              onMouseLeave={() => setHoveredDate()}
              className={`date ${
                date.getMonth() == i.getMonth() ? "highlight" : ""
              } ${
                dateInBetween(i, selected.date1, selected.date2) ||
                dateInBetween(i, selected.date1, selected.hovered)
                  ? "inRange"
                  : ""
              } ${
                isDatesAreEqual(i, selected.date1) ||
                isDatesAreEqual(i, selected.date2)
                  ? "selected"
                  : ""
              }`}
            >
              {i?.getDate()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
