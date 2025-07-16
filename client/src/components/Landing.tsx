import { techIcons } from "@/constants/techIcons";
import FloatingIcon from "./FloatingIcon";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex w-full justify-center items-center text-center h-[80dvh]"
      style={{
        backgroundImage: `
          linear-gradient(to right, #2f2f2f 1px, transparent 1px),
          linear-gradient(to bottom, #2f2f2f 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    >
      {/* Floating icons */}
      {techIcons.map((icon, index) => (
        <FloatingIcon key={index} classname={icon.position}>
          <img src={icon.src} alt={icon.alt} className="w-full h-full" />
        </FloatingIcon>
      ))}

      {/* Main Content */}
      <div className="max-w-[550px] lg:max-w-[600px]">
        <h1 className="text-3xl pb-1 lg:pb-3 text-white md:text-5xl font-semibold">
          Master Coding.
        </h1>
        <h2 className="text-3xl pb-1 lg:pb-3 text-white md:text-5xl font-semibold">
          Land Your Dream Job.
        </h2>
        <h2 className="text-3xl pb-1 lg:pb-3 text-white md:text-5xl font-semibold">
          Practice. Improve. Succeed.
        </h2>

        <p className="text-[#92959c] pt-4">
          Practice real interview questions, improve your problem-solving
          skills, and become a confident developer, one challenge at a time.
        </p>
        <div className="flex space-x-4 justify-center pt-6">
          <button className="cursor-pointer px-4 py-1 rounded-full bg-[#2b2b2b] outline-1">
            Get Started
          </button>
          <button
            onClick={() => navigate("/problems")}
            className="cursor-pointer px-4 py-1 rounded-full bg-[#6166b9] hover:bg-[#3c4069]"
          >
            See Problems
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
