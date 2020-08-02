import AccessResourcesEN from '../access/resource/AccessResourceEN';
import AccessResourcesTH from '../access/resource/AccessResourceTH';
import AuthenticationResourceEN from '../authentication/resource/AuthenticationResourceEN';
import AuthenticationResourceTH from '../authentication/resource/AuthenticationResourceTH';
import LocationResourceEN from '../location/resource/LocationResourceEN';
import LocationResourceTH from '../location/resource/LocationResourceTH';
import MyProfileResourceEN from '../myprofile/resource/MyProfileResourceEN';
import MyProfileResourceTH from '../myprofile/resource/MyProfileResourceTH';
import ReportResourcesEN from '../report/resource/ReportResourceEN';
import ReportResourcesTH from '../report/resource/ReportResourceTH';
import SetupResourcesEN from '../setup/resource/SetupResourceEN';
import SetupResourcesTH from '../setup/resource/SetupResourceTH';
import CommonResourcesEN from './ResourcesEN';
import CommonResourcesTH from './ResourcesTH';

const ResourcesEN = {
  ...CommonResourcesEN,
  ...AuthenticationResourceEN,
  ...MyProfileResourceEN,
  ...AccessResourcesEN,
  ...SetupResourcesEN,
  ...ReportResourcesEN,
  ...LocationResourceEN
};
const ResourcesTH = {
  ...CommonResourcesTH,
  ...AuthenticationResourceTH,
  ...MyProfileResourceTH,
  ...AccessResourcesTH,
  ...SetupResourcesTH,
  ...ReportResourcesTH,
  ...LocationResourceTH
};

const Resources = {
  ['en']: ResourcesEN,
  ['th']: ResourcesTH
};

export default Resources;
