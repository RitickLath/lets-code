import { QuestionTags } from "@/constants/tags";
import axios from "axios";
import { useState, type Dispatch, type SetStateAction } from "react";
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";

const ShowTopic = ({
  setQuestionData,
  setIsFiltered,
}: {
  setQuestionData: Dispatch<SetStateAction<never[]>>;
  setIsFiltered: Dispatch<SetStateAction<boolean>>;
}) => {
  const [expanded, setIsExpanded] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleClick = async (tag: string) => {
    if (selectedTag === tag) {
      // Tag already selected: deselect it
      setSelectedTag(null);
      setIsFiltered(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/api/problems/tags?tag=${tag}`
      );
      if (!response.data.success) {
        console.log("Error Occured" + response.data.error);
      }
      setIsFiltered(true);
      setSelectedTag(tag);
      setQuestionData(response.data.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div>
      {QuestionTags.map((element, index) => (
        <button
          onClick={() => handleClick(element.title)}
          key={index}
          className={`${
            !expanded &&
            `${index > 5 ? "hidden" : ""} ${
              selectedTag == element.title ? "text-blue-400" : ""
            }`
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
