/**
 *
 * Created by danli on 4/18/2017.
 */

import { Profiles } from '/imports/api/profiles/ProfilesCollection';
// import { Events } from '/imports/api/events/eventsCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  // Events.removeAll();
  Tastes.removeAll();
}