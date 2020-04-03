import moment from 'moment-timezone';

const parseDatetime = (datetime) => {
  let parsedDate = "----";
  let dt = datetime;

  if (datetime) {
    const zone = moment.tz.guess();
    dt = moment.tz(datetime, zone);
    const date = dt.format('MMM DD YYYY');
    const time = dt.format('LT');

    parsedDate = `${date} | ${time}`;
  }

  return [dt, parsedDate];
};

const formatPhoneNumber = (number) => {
  const phoneNumber = number || "";
  const [
    _,
    areaCode = "",
    first = "",
    second = ""
  ] = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})/) || []

  return `(${areaCode})-${first}-${second}`;
}

export const parsePhoneNumbers = (numbers) => numbers.map((number) => {
  const parsedNumber = { ...number };
  parsedNumber.phone = formatPhoneNumber(parsedNumber.phone);
  [parsedNumber.created, parsedNumber.parsedCreated] = parseDatetime(number.created);
  [parsedNumber.lastSend, parsedNumber.parsedLastSend] = parseDatetime(number.lastSend);
  [parsedNumber.lastReceived, parsedNumber.parsedLastReceived] = parseDatetime(number.lastReceived);
  return parsedNumber;
});
