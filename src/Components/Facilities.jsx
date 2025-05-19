import { motion } from "framer-motion";
import { Zoom } from "react-awesome-reveal";

const About = () => {
  return (
    <section className=" py-16 px-6 md:px-12 lg:px-20" id="about">
      <div className="max-w-5xl mx-auto text-center">
        <Zoom>
          <h2 className="text-4xl font-bold text-[#4DB2F6] ">
            Facilities & Services
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

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <Zoom>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white border-2 border-transparent shadow-lg rounded-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 ${
                hoverBorderColors[index % hoverBorderColors.length]
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="mb-4 w-20 h-20"
              />

              <h3
                className={`text-xl font-semibold text-[#4DB2F6] hover:scale-105  `}
              >
                {feature.title}
              </h3>
              <p className="text-gray-500 mt-2">{feature.description}</p>
            </div>
          ))}
        </Zoom>
      </div>
    </section>
  );
};

const features = [
  {
    image:
      "https://cdn-icons-png.freepik.com/256/4076/4076949.png?ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
    title: "Modern Gym",
    description: "Stay fit with top-notch fitness equipment for Gym.",
  },
  {
    image:
      "https://cdn-icons-png.freepik.com/256/12549/12549593.png?ga=GA1.1.687432857.1714536364&semt=ais_hybrid",
    title: "24/7 Security",
    description: "Ensuring a safe and secure environment for residents.",
  },
  {
    image:
      "https://cdn-icons-png.freepik.com/256/17604/17604988.png?ga=GA1.1.687432857.1714536364&semt=ais_hybrid",
    title: "Green Garden",
    description: "Relax in beautifully maintained green spaces.",
  },
  {
    image:
      "https://cdn-icons-png.freepik.com/256/17379/17379938.png?uid=R159445612&ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
    title: "Infinity Pool",
    description: "Enjoy breath-taking views while swimming.",
  },
  {
    image:
      "https://cdn-icons-png.freepik.com/256/13108/13108452.png?uid=R159445612&ga=GA1.1.94081497.1723952170&semt=ais_hybrid0",
    title: "Spacious Parking",
    description: "Ample parking space for residents and guests.",
  },
  {
    image: "https://img.icons8.com/?size=160&id=WFSwqY94BLIl&format=png",
    title: "High-Speed WiFi",
    description: "Stay connected with fast and reliable internet.",
  },
];

const gradientTextColors = [
  "hover:text-blue-400",
  "hover:text-purple-400",
  "hover:text-green-400",
  "hover:text-pink-500",
  "hover:text-[#4F5D73]",
  "hover:text-[#00CDD9]",
];

const hoverBorderColors = [
  "hover:border-blue-400",
  "hover:border-purple-400",
  "hover:border-green-400",
  "hover:border-pink-500",
  "hover:border-[#4F5D73]",
  "hover:border-[#00CDD9]",
];

export default About;
