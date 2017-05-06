import { Interests } from '/imports/api/interest/InterestCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Interests.publish();
Goals.publish();
Profiles.publish();
