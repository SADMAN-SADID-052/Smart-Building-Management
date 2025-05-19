import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const slides = [
    {
      img: "https://img.freepik.com/premium-photo/innovated-building-architecture-inventive-engineering_31965-40040.jpg?ga=GA1.1.687432857.1714536364&semt=ais_hybrid&w=740",
      title: "Innovating Architecture with VR",
    },
    {
      img: "https://img.freepik.com/premium-photo/smart-city-internet-technology-concept_31965-6911.jpg?ga=GA1.1.687432857.1714536364&semt=ais_hybrid&w=740",
      title: "Smart Control Room Solutions",
    },
    {
      img: "https://img.freepik.com/premium-photo/innovated-building-architecture-inventive-engineering_31965-264421.jpg?ga=GA1.1.687432857.1714536364&semt=ais_hybrid&w=740",
      title: "Efficiency in Engineering",
    },
    {
      img: "https://img.freepik.com/free-photo/man-holding-smartphone-with-apartment-buildings-hologram_23-2149369107.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid",
      title: "Smart City with Holographic Tech",
    },
  ];

  return (
    <div className="">
      <Carousel autoPlay infiniteLoop interval={2000} showThumbs={false}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img src={slide.img} className="object-cover h-[500px] w-full" />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-6">
              <h2 className="text-white text-2xl md:text-4xl font-bold text-left">
                {slide.title}
              </h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
