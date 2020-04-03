import moment from 'moment-timezone'

export const batchStatsToItemList = (batchStats) => {
  const zone = moment.tz.guess();
  return batchStats.map(stat => {
    const date = moment.tz(stat.lastSend, zone);
    const dt = date.format('L');
    const time = date.format('LT');
    return {
      ...stat,
      lastSend: date,
      lastSendParsed: `${dt} | ${time}`
    }
  });
};
