import LegacyRedirect from '../components/Common/LegacyRedirect';

const hashDestinations = {
  '#papers': '/#papers',
  '#presentations': '/#presentations',
};

export default function Research() {
  return <LegacyRedirect destination="/#papers" label="About" hashDestinations={hashDestinations} />;
}
