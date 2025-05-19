import React from "react";
import { Zoom } from "react-awesome-reveal";

const AboutBuilding = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16" id="about-building">
      <div className="max-w-5xl mx-auto text-center mt-10">
        <Zoom>
          <h2 className="text-4xl font-bold text-[#4DB2F6] ">
            About SmartHaven
          </h2>
        </Zoom>

        <Zoom duration={1000}>
          <p className="text-sm md:text-base lg:text-lg lg:text-gray-700 mt-10">
            SmartHaven is an advanced Building Management System (BMS) designed
            to <br />
            streamline apartment rental, tenant management, and administrative
            operations.
          </p>
        </Zoom>
      </div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mt-16">
        {/* Image */}
        <div className="order-2 lg:order-1">
          <img
            src="https://img.freepik.com/premium-photo/carbon-offset-price-report-co2-emission-future-growth-net-zero-waste-esg-ethical-sme-office-protect-climate-change-global-warming-social-issues-project-group-asia-people-eco-friendly-sdgs-plan_265022-99342.jpg?ga=GA1.1.687432857.1714536364&semt=ais_hybrid&w=740"
            alt="SmartHaven Building"
            className="w-full h-auto rounded-3xl shadow-xl"
          />
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <p className="text-lg text-gray-600 mb-6">
            <strong>SmartHaven</strong> is more than just a building—it's a
            carefully designed living space that blends{" "}
            <span className="">modern architecture</span>,{" "}
            <span className="">sustainable technology</span>, and{" "}
            <span className="">community-focused design</span>.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className=" rounded-xl p-4 shadow-md"
              style={{
                borderBottom: "4px solid",
                borderImage:
                  "linear-gradient(to right, #60B783, #22d3ee, #53AFCf) 1",
              }}
            >
              <h4 className="text-lg font-semibold text-gray-800">
                🏗️ Architectural Harmony
              </h4>
              <p className="text-sm text-gray-600">
                Optimal use of space, light, and air with elegant design.
              </p>
            </div>
            <div
              className="rounded-xl p-4 shadow-md"
              style={{
                borderBottom: "4px solid",
                borderImage:
                  "linear-gradient(to right, #60B783, #22d3ee, #53AFCf) 1",
              }}
            >
              <h4 className="text-lg font-semibold text-gray-800">
                🌱 Eco-Conscious Design
              </h4>
              <p className="text-sm text-gray-600">
                Built with sustainability in mind—solar, rainwater, and more.
              </p>
            </div>
            <div
              className=" rounded-xl p-4 shadow-md"
              style={{
                borderBottom: "4px solid",
                borderImage:
                  "linear-gradient(to right, #60B783, #22d3ee, #53AFCf) 1",
              }}
            >
              <h4 className="text-lg font-semibold text-gray-800">
                📲 Smart Integration
              </h4>
              <p className="text-sm text-gray-600">
                IoT-enabled systems for real-time control and energy tracking.
              </p>
            </div>
            <div
              className="rounded-xl p-4 shadow-md"
              style={{
                borderBottom: "4px solid",
                borderImage:
                  "linear-gradient(to right, #60B783, #22d3ee, #53AFCf) 1",
              }}
            >
              <h4 className="text-lg font-semibold text-gray-800">
                🧑‍🦽 Inclusive Living
              </h4>
              <p className="text-sm text-gray-600">
                Fully accessible for all residents and guests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
