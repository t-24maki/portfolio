import LegacyRedirect from '../components/Common/LegacyRedirect';

const hashDestinations = {
  '#talks': '/#talks',
  '#press': '/#press',
  '#courses': '/#channels',
};

export default function Media() {
  return <LegacyRedirect destination="/#channels" label="About" hashDestinations={hashDestinations} />;
}
