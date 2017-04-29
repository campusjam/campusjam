import { Profiles } from '/imports/api/profiles/ProfilesCollection';
// import { Interests } from '/imports/api/interest/InterestCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  // Interests.removeAll();
}
