const steps = [
  {
    title: "Step 1: Login or Register",
    description: "Browse through various apartment listings and find the one that suits you best.",
  },
  {
    title: "Step 2: Explore & Request Membership",
    description: "View available apartments and send a request to become a member of your preferred one.",
  },
  {
    title: "Step 3: Easy Payment Options",
    description: "Choose from multiple payment methods for a smooth and secure checkout experience.",
  },
  {
    title: "Step 4: Enjoy Your Apartment",
    description: "Move in and start enjoying your new apartment with all the facilities you've selected.",
  },
];

const BookingSteps = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-12">How It Works</h2>
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              } gap-8`}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-sky-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                {/* {index + 1} */}
                 <span className=" bg-clip-text bg-gradient-to-r text-white font-bold text-3xl animate-pulse">
                  {index + 1}
                </span>
              </div>
              <div className="md:w-3/4 text-center md:text-left px-4">
                <h3 className="text-xl font-semibold text-sky-700">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSteps;
