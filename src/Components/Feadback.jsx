import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David R",
    quote:
      "SmartHaven completely changed our lifestyle. The smart controls, peaceful rooftop, and fast maintenance response make everyday living feel premium.",
  },
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Emily T",
    quote:
      "The high-speed Wi-Fi and quiet co-working lounge have been a blessing. It's more than just a home—it's a productivity hub.",
  },
  {
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    name: "Mark L",
    quote:
      "I love how secure and family-friendly the environment is. My kids enjoy the play zones and I appreciate the community events!",
  },
];

const TestimonialSection = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Heading */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-400 leading-tight mb-4">
            Hear From Our Residents
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-cyan-500 mb-6">
            Experience that Speaks for Itself
          </h3>
          <p className="text-gray-700 text-base md:text-lg max-w-md">
            What our community says about living at SmartHaven!!
          </p>
        </div>

        {/* Right: Slider */}
        <div className="relative">
          <Slider {...sliderSettings}>
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6">
                <div className="relative bg-white rounded-3xl shadow-lg p-10 text-center border border-gray-100 min-h-[320px]">
                  {/* Top-left icon */}
                  <img
                    src="https://cdn-icons-png.freepik.com/256/13075/13075858.png?uid=R159445612&ga=GA1.1.94081497.1723952170&semt=ais_hybrid"
                    alt="soccer icon"
                    className="absolute top-5 left-5 w-12"
                  />

                  {/* User Image */}
                  <div className="flex justify-center mb-6">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 text-lg mb-4">"{t.quote}"</p>

                  {/* Name */}
                  <p className="text-cyan-600 font-semibold text-lg">— {t.name}</p>

                  {/* Bottom-right logo */}
                  <img
                    src="https://img.icons8.com/?size=128&id=44859&format=png
                    " // Replace with actual path
                    alt="Gameground logo"
                    className="absolute bottom-5 right-5 w-10 h-10"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
