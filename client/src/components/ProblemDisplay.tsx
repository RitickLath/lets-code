/* eslint-disable @typescript-eslint/no-explicit-any */
// like count and author

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaBrain,
  FaExpand,
  FaTags,
  FaAngleUp,
  FaAngleDown,
  FaShopware,
  FaLightbulb,
} from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineReplay10 } from "react-icons/md";

const ProblemDisplay = () => {
  const { id } = useParams();
  const [index, setIndex] = useState<null | number>(null);

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = (idx: number) => {
    setIndex(index === idx ? null : idx);
  };

  const fetchData = async (qid: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/problems/id/${qid}`
      );
      if (!response.data.success) {
        setError(response.data.error || "Failed to fetch problem data.");
      } else {
        setData(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchData(id || "687677c979aa0b51254c0ddc");
  }, [id]);

  if (error) return <div className="text-red-400">{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full">
      {/* Top Navigation Bar */}
      <div className="px-3 flex justify-between bg-[#2e2e2e] rounded-xl items-center">
        <div className="rounded-md flex space-x-4 w-full py-2">
          <button className="flex hover:text-blue-400 items-center space-x-1 text-sm">
            <TbFileDescription />
            <span>Description</span>
          </button>
          <button className="flex hover:text-blue-400 items-center space-x-1 text-sm">
            <MdOutlineReplay10 />
            <span>Submissions</span>
          </button>
          <button className="flex hover:text-blue-400 items-center space-x-1 text-sm">
            <FaBrain />
            <span>Ask AI</span>
          </button>
        </div>
        <div className="hidden md:flex">
          <FaExpand className="hover:text-blue-400 cursor-pointer" />
        </div>
      </div>

      {/* Problem Details */}
      <div className="mt-8">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-2xl font-semibold">{data.title || "Untitled"}</h1>
        </div>

        {/* Tags/Difficulty Banner */}
        <div className="flex items-center space-x-3 mt-2 mb-3">
          <span
            className={`flex items-center space-x-2 bg-[#2e2e2e] text-sm py-1 px-4 rounded-2xl ${
              data.difficulty === "Easy"
                ? "text-green-300"
                : data.difficulty === "Medium"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {data.difficulty}
          </span>
          <span className="text-yellow-200  flex items-center space-x-2 bg-[#2e2e2e] text-sm py-1 px-4 rounded-2xl">
            <FaShopware />
            <span>Companies</span>
          </span>
          <span className="text-orange-300  flex items-center space-x-2 bg-[#2e2e2e] text-sm py-1 px-4 rounded-2xl">
            <FaTags />
            <span>Topics</span>
          </span>
          <span className="text-blue-400  flex items-center space-x-2 bg-[#2e2e2e] text-sm py-1 px-4 rounded-2xl">
            <FaLightbulb />
            <span>Hint</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-normal pb-4 text-gray-300">
          {data.description || "No description provided."}
        </p>

        {/* Examples */}
        {data.testcase?.map((test: any, idx: number) => (
          <div key={test._id} className="mb-4">
            <h1 className="text-lg font-medium pb-2">Example {idx + 1}:</h1>
            <div className="border-l-2 border-gray-500 py-1 px-3">
              <h2>
                Input: <span>{test.input}</span>
              </h2>
              <h2>
                Output: <span>{test.output}</span>
              </h2>
            </div>
          </div>
        ))}

        {/* Constraints */}
        <div className="mt-6">
          <h1 className="text-lg font-medium pb-2">Constraints:</h1>
          <li>{data.constraints || "No constraints provided."}</li>
        </div>
      </div>

      {/* Collapsible Panels */}
      <div className="mt-8">
        {/* Topics Section */}
        <div className="border-t-[2px] border-[#3f3e3e] py-2 px-4">
          <div
            onClick={() => handleClick(1)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center space-x-2 text-md">
              <FaTags />
              <span>Topics</span>
            </div>
            {index === 1 ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          {index === 1 && (
            <div className="my-3 flex gap-2 flex-wrap">
              {data.tags?.length > 0 ? (
                data.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-[#2e2e2e] text-gray-400 py-1 px-4 rounded-2xl"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p>No topics listed.</p>
              )}
            </div>
          )}
        </div>

        {/* Companies Section */}
        <div className="border-t-[2px] border-[#3f3e3e] py-2 px-4">
          <div
            onClick={() => handleClick(2)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center space-x-2 text-md">
              <FaShopware />
              <span>Companies</span>
            </div>
            {index === 2 ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          {index === 2 && (
            <div className="my-3 flex gap-2 flex-wrap">
              {data.companies?.length > 0 ? (
                data.companies.map((company: string, i: number) => (
                  <span
                    key={i}
                    className="bg-[#2e2e2e] text-gray-400 py-1 px-4 rounded-2xl"
                  >
                    {company}
                  </span>
                ))
              ) : (
                <p>No companies listed.</p>
              )}
            </div>
          )}
        </div>

        {/* Hint Sections */}
        {data.hint?.map((hint: string, idx: number) => (
          <div key={idx} className="border-t-[2px] border-[#3f3e3e] py-2 px-4">
            <div
              onClick={() => handleClick(3 + idx)}
              className="cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-2 text-md">
                <FaLightbulb />
                <span>Hint {idx + 1}</span>
              </div>
              {index === 3 + idx ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {index === 3 + idx && (
              <div className="my-3">
                <h1 className="text-gray-300">{hint}</h1>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemDisplay;
