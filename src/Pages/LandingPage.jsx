import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/landing/Hero";
import TrustStats from "../components/landing/TrustStats";
import PrivacyFeatures from "../components/landing/PrivacyFeatures";
import HowItWorks from "../components/landing/HowItWorks";
import FinalCTA from "../components/landing/FinalCTA";

export default function LandingPage() {
  return (

    // <div className="bg-red-500 text-white font-bold p-10 text-4xl">
    //   Tailwind is working!
    // </div>

    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      <Hero />
      <TrustStats />
      <PrivacyFeatures />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </div>


  );
}

