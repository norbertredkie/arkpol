import Nav from "./components/Nav";
import HeroKinetic from "./components/HeroKinetic";
import Statement from "./components/Statement";
import ValueProps from "./components/ValueProps";
import EntityMap from "./components/EntityMap";
import SocialProof from "./components/SocialProof";
import Services from "./components/Services";
import Faq from "./components/Faq";
import ContentHub from "./components/ContentHub";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <HeroKinetic />
        <Statement />
        <ValueProps />
        <EntityMap />
        <SocialProof />
        <Services />
        <Faq />
        <ContentHub />
      </main>
      <Footer />
    </>
  );
}
