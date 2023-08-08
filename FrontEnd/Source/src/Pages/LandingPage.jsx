import React from "react";
import Navbar from "../Components/Navbar";
import KYCsection from "../Components/KYCsection";
import LandingPageSection from "../Components/LandingPageSection";

const LandingPage = () => {
  return (
    <div className="  border">
      <Navbar />
      <KYCsection />
      <LandingPageSection />
    </div>
  );
};

export default LandingPage;
