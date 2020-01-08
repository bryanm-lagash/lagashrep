function calculateAge(birthday) {
  const birthday_arr = birthday.split("-");
  const birthday_date = new Date(
    birthday_arr[2],
    birthday_arr[1] - 1,
    birthday_arr[0]
  );
  const ageDifMs = Date.now() - birthday_date.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const dateToday = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return (today = dd + "-" + mm + "-" + yyyy);
};

module.exports = { calculateAge, dateToday };
