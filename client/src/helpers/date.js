export const getDate = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const month = monthNames[date.getMonth()];
  const day = () => {
    let _date = date.getDate();
    if (_date.length === 1) {
      return _date === 1
        ? `${_date}st`
        : _date === 2
        ? `${_date}nd`
        : _date === 3
        ? `${_date}rd`
        : `${_date}th`;
    } else {
      return _date[1] === 1
        ? `${_date}st`
        : _date[1] === 2
        ? `${_date}nd`
        : _date[1] === 3
        ? `${_date}rd`
        : `${_date}th`;
    }
  };
  const year = date.getFullYear();
  return `${month} ${day()}, ${year}`;
};
