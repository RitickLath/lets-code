import { testimonials } from "@/constants/testimonials";
import FeedbackCard from "./FeedbackCard";

const Testimonial = () => {
  return (
    <div className="flex flex-col w-full items-center py-12 px-4">
      <h1 className="text-2xl lg:text-3xl max-w-[600px] text-center pb-8 text-white md:text-5xl font-semibold">
        We are building Let's Code with feedback from the best devs in the
        world.
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {testimonials.map((t, i) => (
          <FeedbackCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
