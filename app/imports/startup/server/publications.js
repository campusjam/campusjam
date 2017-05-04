import { Interests } from '/imports/api/interest/InterestCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Interests.publish();
Capabilities.publish();
Profiles.publish();
