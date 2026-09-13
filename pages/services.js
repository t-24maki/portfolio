import LegacyRedirect from '../components/Common/LegacyRedirect';

const hashDestinations = { '#advisory': '/#advisory', '#training': '/#training' };

export default function Services() {
  return <LegacyRedirect destination="/#services" label="About" hashDestinations={hashDestinations} />;
}
