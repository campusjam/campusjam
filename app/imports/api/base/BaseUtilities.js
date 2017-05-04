import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Capabilities.removeAll();
}
