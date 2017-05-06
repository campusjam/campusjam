import { Interests } from '/imports/api/interest/InterestCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Interests.publish();
Goals.publish();
Capabilities.publish();
Tastes.publish();
Profiles.publish();
