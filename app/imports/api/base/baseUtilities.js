/**
 *
 * Created by danli on 4/18/2017.
 */

import { Profiles } from '/imports/api/profiles/profilesCollection';
// import { Events } from '/imports/api/events/eventsCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  // Events.removeAll();
}