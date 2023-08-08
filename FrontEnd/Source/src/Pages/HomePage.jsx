import React from "react";
import Navbar from "../Components/Navbar";
import KYCsection from "../Components/KYCsection";
import Dashboard from "../Components/Dashboard";
import HomePagesection2 from "../Components/HomePagesection2";
import Footer from "../Components/Footer";

const HomePage = ({ user }) => {
  console.log(user);
  return (
    <div>
      <Navbar user={user} />
      <KYCsection />
      <Dashboard user={user} />
      <HomePagesection2 />
      <Footer />
    </div>
  );
};

export default HomePage;
