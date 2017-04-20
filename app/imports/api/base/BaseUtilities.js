import { Event } from '/imports/api/event/EventCollection';
// import { Interests } from '/imports/api/interest/InterestCollection';

export function removeAllEntities() {
  Event.removeAll();
  // Interests.removeAll();
}
