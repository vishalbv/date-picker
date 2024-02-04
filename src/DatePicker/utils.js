export const firstDayInMonthIndex = (
  monthIndex = new Date().getMonth(),
  year = new Date().getFullYear()
) => new Date(`${year}-${monthIndex + 1}-01`).getDay();

export const daysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const formatDate = (d) => {
  const leadingZero = (a) => ("0" + a).slice(-2);
  return (
    d.getFullYear() +
    "-" +
    leadingZero(d.getMonth() + 1) +
    "-" +
    leadingZero(d.getDate())
  );
};

export const formatDateInMonth = (d) => {
  return d.toLocaleString("en-US", { month: "short" }) + ", " + d.getFullYear();
};

export const isDatesAreEqual = (a, b) => {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const dateInBetween = (check, date1, date2) => {
  return (
    check &&
    date1 &&
    date2 &&
    check < (date1 > date2 ? date1 : date2) &&
    check > (date1 > date2 ? date2 : date1)
  );
};
