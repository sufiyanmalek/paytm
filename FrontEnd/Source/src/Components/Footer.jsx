import React from "react";
import Accordian from "./Accordian";

const Footer = () => {
  return (
    <div className="  w-[100%] bg-[#f5f7fa] ">
      <div className="lg:px-64 md:px-10 px-5 md:py-14 py-20">
        <div className="">
          <div className="flex flex-wrap py-10 xl:justify-between justify-center items-center">
            <div className="xl:flex hidden ">
              <p className="text-xl font-medium">
                Download Paytm App to <br />
                Pay from anywhere
              </p>
              <div className="flex mx-2">
                <a
                  href="https://itunes.apple.com/in/app/mobile-recharge-bill-payments/id473941634?mt=8"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Download Paytm iOS app"
                    src="/images/downloadApple.svg"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=net.one97.paytm"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Download Paytm Android app"
                    src="/images/downloadGoogle.svg"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
            <div className="flex justify-between my-4">
              <a
                href="https://twitter.com/paytm"
                rel="noopener noreferrer"
                target="_blank"
                className="mx-3"
              >
                <img
                  alt="twitter_icon"
                  src="/images/twitter.svg"
                  loading="lazy"
                />
              </a>
              <a
                href="https://instagram.com/paytm"
                rel="noopener noreferrer"
                target="_blank"
                className="mx-3"
              >
                <img
                  alt="instagram_icon"
                  src="/images/instagram.svg"
                  loading="lazy"
                />
              </a>
              <a
                href="https://facebook.com/paytm"
                rel="noopener noreferrer"
                target="_blank"
                className="mx-3"
              >
                <img
                  alt="facebook_icon"
                  src="/images/facebook.svg"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
          <hr className="border border-gray-200" />
          <div className="py-10">
            <Accordian
              heading={"Investor Relations"}
              content={[
                "Home",
                "Financials",
                "Filings & Press Releases",
                "News & Events",
                "Corporate Governance",
                "Resources",
              ]}
            />
            <Accordian
              heading={"More About Paytm"}
              content={[
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laboriosam nobis quis non numquam nulla eligendi quaerat aperiam blanditiis nemo itaque id ullam sunt dolorum, cum, voluptas, beatae officiis quisquam culpa ab cupiditate iusto et quo totam. Esse voluptas veniam id incidunt sapiente impedit, iusto nemo accusamus laudantium rem tempore laborum praesentium fugiat iure atque commodi inventore nobis? Doloribus aspernatur repudiandae quos deserunt esse voluptate qui laboriosam explicabo. Incidunt totam veniam ipsum ipsam corporis consectetur, eveniet ut quos non animi libero quisquam vero quaerat qui veritatis at nobis. Beatae possimus eligendi numquam cupiditate natus! Consequuntur hic inventore qui animi perferendis!",
              ]}
            />
            <Accordian
              heading={"Company"}
              content={[
                "About Us",
                "CSR",
                "Blog",
                "Contact Us",
                "Terms & Conditions",
                "Sustainability",
              ]}
            />
            <div
              onClick={() => setShow(!show)}
              className="flex gap-2 items-center cursor-pointer py-5"
            >
              <p className="text-sm font-semibold text-slate-700">Career</p>

              <div className="border flex-1 border-gray-200"></div>
            </div>
            <Accordian
              heading={"Recharge & pay bills"}
              content={[
                "Mobile Recharge",
                "Mobile Bill Payment",
                "Datacard Recharge",
                "Datacard Bill Payment",
                "Dth Recharge",
                "Electricity Bill Payment",
                "Landline Bill Payment",
                "Broadband Bill Payment",
                "Gas Bill Payment",
                "Water Bill Payment",
                "Metro Card Recharge",
                "Municipal Recharge",
                "Toll Recharge",
                "Credit Bill Payment",
                "Cabletv Recharge",
                "Devotion",
                "Rental Bill Payment",
                "Fastag Recharge",
              ]}
            />
            <Accordian
              heading={"Pay Loan EMI, Insurance Premiums & Education Fee"}
              content={["Pay Loan EMI", "Pay Insurance Premium"]}
            />
            <Accordian
              heading={"Book Travel & Entertainment"}
              content={[
                "Movie Ticket Booking",
                "Bus Ticket Booking",
                "Flight Tickets Booking",
                "Train Ticket Booking",
                "Events Booking",
                "Upcoming Movies",
                "Trains Sitemap",
                "Bus Sitemap",
              ]}
            />

            <Accordian
              heading={"Investments & Miscellaneous"}
              content={[
                "Mutual Fund Investments",
                "Fee Payment",
                "Google Play Recharge",
                "Fastag",
                "QR Code Scanner",
                "Train Tickets",
                "Paytm Service Agent",
                "Paytm Careers",
                "Free Credit Score",
              ]}
            />
            <Accordian
              heading={"Loans and Credit Cards"}
              content={[
                "Postpaid",
                "Credit Cards",
                "Personal Loan",
                "Credit Report",
              ]}
            />
            <Accordian
              heading={"Financial Tools & Calculators"}
              content={[
                "EMI Calculator",
                "Personal Loan EMI Calculator",
                "Home Loan EMI Calculator",
                "Car Loan EMI Calculator",
                "IFSC Code Finder",
                "Financial Tools & Calculators",
              ]}
            />
          </div>
        </div>
      </div>
      <div
        className="border-4 border-[#00baf2]
      "
      ></div>
      <div className="border-4 border-[#002970]"></div>
    </div>
  );
};

export default Footer;
