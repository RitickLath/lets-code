import { FaBrain, FaExpand } from "react-icons/fa";
import { MdOutlineReplay10 } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";

const ProblemDetailPageNavbar = ({
  setIndex,
}: {
  setIndex: (a: 1 | 2 | 3) => void;
}) => {
  return (
    <div className="px-3 mr-2 flex justify-between bg-[#2e2e2e] rounded-xl items-center">
      <div className="rounded-md flex space-x-4 w-full py-2">
        <button
          onClick={() => setIndex(1)}
          className="flex cursor-pointer hover:text-blue-400 items-center space-x-1 text-sm"
        >
          <TbFileDescription />
          <span>Description</span>
        </button>
        <button
          onClick={() => setIndex(2)}
          className="flex cursor-pointer hover:text-blue-400 items-center space-x-1 text-sm"
        >
          <MdOutlineReplay10 />
          <span>Submissions</span>
        </button>
        <button
          onClick={() => setIndex(3)}
          className="flex cursor-pointer hover:text-blue-400 items-center space-x-1 text-sm"
        >
          <FaBrain />
          <span>Ask AI</span>
        </button>
      </div>
      <div className="hidden md:flex">
        <FaExpand className="hover:text-blue-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default ProblemDetailPageNavbar;
