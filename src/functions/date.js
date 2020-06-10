import pt from 'date-fns/locale/pt';
import {
  getDay,
  setDay,
  addDays,
  subDays,
  getMonth,
  format,
  getWeek,
  addWeeks,
  subWeeks,
} from 'date-fns';

export function formatedWeeksNavigation(week) {
  const finalWeek = addDays(week, 4);

  return getMonth(finalWeek) !== getMonth(week)
    ? format(week, "dd 'de' MMMM 'a' ", { locale: pt }) +
        format(finalWeek, "dd 'de' MMMM", { locale: pt })
    : format(week, "dd 'a' ") +
        format(finalWeek, "dd 'de' MMMM", { locale: pt });
}

export function getDayOfWeek(week) {
  const days = [];

  if (getWeek(week) === getWeek(new Date())) {
    const indexDay = getDay(new Date());
    for (let i = 0; i <= indexDay - 1; i += 1) {
      days.push({ id: indexDay - i, date: subDays(new Date(), i) });
    }

    return days;
  }

  for (let i = 4; i >= 0; i -= 1) {
    days.push({ id: i + 1, date: addDays(week, i) });
  }

  return days;
}