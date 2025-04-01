import { motion } from "framer-motion";
import { Zoom } from "react-awesome-reveal";

const About = () => {
  return (
    <section
      className=" py-16 px-6 md:px-12 lg:px-20"
      id="about"
  
    >
      <div className="max-w-5xl mx-auto text-center">
        <Zoom>
          <h2 className="text-3xl font-semibold text-[#FFB200]">
            About Our Building
          </h2>
        </Zoom>

        <Zoom duration={1000}>
          <p className=" text-gray-300 mt-10  text-sm">
            SmartHaven is an advanced Building Management System (BMS) designed
            to <br />
            streamline apartment rental, tenant management, and administrative
            operations.
          </p>
        </Zoom>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Zoom>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-md p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="mb-4 w-20 h-20"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                {feature.title}
              </h3>
              <p className="text-gray-500 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </Zoom>
      </div>
    </section>
  );
};

const features = [
  {
    image:
      "https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114205.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
    title: "Modern Gym",
    description: "Stay fit with top-notch fitness equipment for Gym.",
  },
  {
    image:
      "https://img.freepik.com/free-vector/shield_78370-582.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
    title: "24/7 Security",
    description: "Ensuring a safe and secure environment for residents.",
  },
  {
    image:
      "https://img.freepik.com/free-photo/front-view-3d-tree-with-leaves-trunk_23-2150800377.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
    title: "Green Garden",
    description: "Relax in beautifully maintained green spaces.",
  },
  {
    image:
      "https://img.freepik.com/premium-vector/palmera-circular-con-mar-abstracto-y-molino-de-agua-en-la-parte-superior-vector-gratis_1249511-1480.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
    title: "Infinity Pool",
    description: "Enjoy breath-taking views while swimming.",
  },
  {
    image:
      "https://img.freepik.com/premium-vector/parking-area-traffic-sign-icon-vector-illustration-symbol-design_757387-5595.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid0",
    title: "Spacious Parking",
    description: "Ample parking space for residents and guests.",
  },
  {
    image:
      "https://img.freepik.com/free-vector/wifi-isometric-icon-wireless-internet-technology-isolated-vector-illustration_107791-4535.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
    title: "High-Speed WiFi",
    description: "Stay connected with fast and reliable internet.",
  },
];

export default About;
