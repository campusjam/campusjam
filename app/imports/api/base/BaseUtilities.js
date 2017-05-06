import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Goals.removeAll();
  Capabilities.removeAll();
  Tastes.removeAll();
}
