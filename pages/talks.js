import LegacyRedirect from '../components/Common/LegacyRedirect';

export default function Talks() {
  return <LegacyRedirect destination="/media/#talks" label="Media" alternative={{ href: "/research/#presentations", label: "学会発表を見る" }} />;
}
