import { QuestionTags } from "@/constants/tags";
import { useState } from "react";
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";

const ShowTopic = () => {
  const [expanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div>
      {QuestionTags.map((element, index) => (
        <button
          key={index}
          className={`${
            !expanded && `${index > 5 ? "hidden" : ""} `
          } mr-1 hover:text-blue-400 cursor-pointer mb-3 py-1 px-3`}
        >
          {element.title}
        </button>
      ))}
      <button
        className="bg-[#2e2e2e] cursor-pointer hover:bg-[#3f3f3f] px-4 py-1 rounded-3xl"
        onClick={() => setIsExpanded(!expanded)}
      >
        <div className="flex space-x-1 items-center">
          <span>{expanded ? "Collapse" : "Expand"}</span>
          <span>{expanded ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}</span>
        </div>
      </button>
    </div>
  );
};

export default ShowTopic;
