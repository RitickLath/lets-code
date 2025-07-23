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
import MarkdownWrapper from "./MarkDownWrapper";

const ProblemDisplay = () => {
  const { id } = useParams();
  const [index, setIndex] = useState<null | number>(null);

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>("");

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
        
        // Newly added (Fetching md file from public)
        const markdownFile = `/problemMd/${response.data.data.description}.md`;
        const mdRes = await fetch(markdownFile);
        console.log(mdRes);
        const mdText = await mdRes.text();
        console.log(mdText);
        setMarkdown(mdText);
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

      <div className="py-4 ">
        <MarkdownWrapper>{markdown}</MarkdownWrapper>
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
