import axios from "axios";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { LuArrowDownUp } from "react-icons/lu";

const levels: Array<"Easy" | "Medium" | "Hard"> = ["Easy", "Medium", "Hard"];

const DifficultyFilter = ({
  setQuestionData,
  setIsFiltered,
}: {
  setQuestionData: Dispatch<SetStateAction<never[]>>;
  setIsFiltered: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<null | "Easy" | "Medium" | "Hard">(
    null
  );

  const handleDifficultySelect = async (
    difficulty: "Easy" | "Medium" | "Hard"
  ) => {
    if (selected == difficulty) {
      setSelected(null);
      setIsFiltered(false);
      return;
    } else {
      setSelected(difficulty);
    }
    setIsDropdownOpen(false);
    try {
      const response = await axios.get(
        `/api/problems/difficulty?difficulty=${difficulty.toLowerCase()}`
      );
      if (!response.data.success) {
        console.log("Error Occured" + response.data.error);
      }
      setIsFiltered(true);
      setQuestionData(response.data.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className={`${
        selected ? "text-blue-500" : "text-gray-400 hover:text-white"
      }  bg-[#2e2e2e]  rounded-full cursor-pointer`}
    >
      <LuArrowDownUp className="text-lg m-2 font-semibold" />

      {isDropdownOpen && (
        <div className="absolute top-9 -right-26 border-[#252525] border-2 bg-[#2e2e2e]  pl-4 pr-14 py-2 rounded-md shadow-lg z-10">
          {levels.map((level) => (
            <h1
              key={level}
              onClick={() => handleDifficultySelect(level)}
              className={`hover:text-white  ${
                selected == level ? "text-blue-400" : "text-gray-400"
              } cursor-pointer py-2`}
            >
              {level}
            </h1>
          ))}
        </div>
      )}
    </div>
  );
};

export default DifficultyFilter;
