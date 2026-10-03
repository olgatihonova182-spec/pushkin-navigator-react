import { TOURS, TIME_FILTERS } from '../model/tours';

export function getTour(id) {
  return TOURS.find((t) => t.id === id);
}

export function toursForTime(filterId) {
  const filter = TIME_FILTERS.find((f) => f.id === filterId);
  return TOURS.filter((t) => t.minutes <= filter.upTo);
}
