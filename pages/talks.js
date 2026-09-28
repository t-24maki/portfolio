import LegacyRedirect from '../components/Common/LegacyRedirect';

export default function Talks() {
  return <LegacyRedirect destination="/#talks" label="講義／講演" alternative={{ href: "/#presentations", label: "学会発表を見る" }} />;
}
