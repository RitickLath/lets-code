import axios from "axios";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";
import DifficultyFilter from "./DifficultyFilter";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const SearchQuestion = ({
  setQuestionData,
  setIsFiltered,
}: {
  setQuestionData: Dispatch<SetStateAction<never[]>>;
  setIsFiltered: Dispatch<SetStateAction<boolean>>;
}) => {
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (keyword.trim().length < 2) {
      setIsFiltered(false);
      return;
    }

    const timerId = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/problems/search?keyword=${keyword}`
        );
        if (!response.data.success) {
          console.log("Error Occured" + response.data.error);
        }
        setIsFiltered(true);
        setQuestionData(response.data.data);
      } catch (error: unknown) {
        console.log(error);
      }
    }, 1000);

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <div className="mt-2 lg:mt-6 flex items-center space-x-8 relative w-full max-w-md">
      {/* Search Icon */}
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <FaSearch />
      </span>

      {/* Search Input */}
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full bg-[#2e2e2e] outline-none pl-10 pr-4 py-2 rounded-3xl text-sm text-white placeholder:text-gray-400"
        placeholder="Search Questions"
      />

      <DifficultyFilter
        setQuestionData={setQuestionData}
        setIsFiltered={setIsFiltered}
      />
    </div>
  );
};

export default SearchQuestion;
