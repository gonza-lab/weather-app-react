import moment from 'moment-timezone';

export default function getTimeZone(unix, offset) {
  const date = moment.tz(moment.unix(unix), offset);
  let hours = date.hour();
  let state;

  if (hours >= 5 && hours < 12) {
    state = 'morning';
  } else if (hours >= 12 && hours < 19) {
    state = 'day';
  } else if (hours >= 19 && hours < 21) {
    state = 'afternoon';
  } else if ((hours >= 21 && hours <= 24) || (hours >= 0 && hours < 5)) {
    state = 'night';
  }

  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];

  return {
    day: days[date.day()],
    date: date.date(),
    hours,
    state,
  };
}
