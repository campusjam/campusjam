import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Goals.removeAll();
  Capabilities.removeAll();
  Tastes.removeAll();
}
