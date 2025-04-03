import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = () => {
  return (
    <div className="">
      <Carousel autoPlay infiniteLoop interval={2000}>
        <div>
          <img  src="https://img.freepik.com/free-photo/man-architect-working-project-with-vr-glasses-new-technologies-3d_1268-29304.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" />
         
        </div>
        <div>
          <img src="https://img.freepik.com/free-photo/workers-control-room_1359-316.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" />

        </div>
        <div>
          <img src="https://img.freepik.com/free-photo/unrecognizable-man-neon-safety-vest-business-suit-sitting-desk-using-laptop_1098-17504.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" />
         
        </div>
        <div>
          <img src="https://img.freepik.com/free-photo/man-holding-smartphone-with-apartment-buildings-hologram_23-2149369107.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid" />
         
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
