// like count and author
import {
  FaTags,
  FaAngleUp,
  FaAngleDown,
  FaShopware,
  FaLightbulb,
} from "react-icons/fa";

import MarkdownWrapper from "./MarkDownWrapper";
import { useState } from "react";

type Problem = {
  _id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  testcase: { input: string; output: string }[];
  constraints: string;
  author: { username: string };
  likeCount: number;
  dislikeCount: number;
  hint: string[];
  companies: string[];
};

const ProblemDisplay = ({
  data,
  markdown,
}: {
  data: Problem | null;
  markdown: string;
}) => {
  const [index, setIndex] = useState<null | number>(null);

  const handleClick = (idx: number) => {
    setIndex(index === idx ? null : idx);
  };

  return (
    <div className="w-full">
      {/* Problem Details */}
      <div className="py-4 ">
        <MarkdownWrapper>{markdown}</MarkdownWrapper>
      </div>

      {/* Collapsible Panels */}
      <div className="mt-8">
        {/* Topics Section */}
        <div className="border-t-[1px] border-[#3f3e3e] py-2 px-4">
          <div
            onClick={() => handleClick(1)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex py-1 items-center space-x-2 text-md">
              <FaTags />
              <span>Topics</span>
            </div>
            {index === 1 ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          {index === 1 && (
            <div className="my-3 flex gap-2 flex-wrap">
              {data?.tags && data?.tags?.length > 0 ? (
                data?.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="bg-[#2e2e2e] text-gray-400 px-4 rounded-2xl"
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
        <div className="border-t-[1px] border-[#3f3e3e] py-2 px-4">
          <div
            onClick={() => handleClick(2)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex py-1 items-center space-x-2 text-md">
              <FaShopware />
              <span>Companies</span>
            </div>
            {index === 2 ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          {index === 2 && (
            <div className="my-3 flex gap-2 flex-wrap">
              {data?.companies && data?.companies?.length > 0 ? (
                data?.companies.map((company: string, i: number) => (
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
        {data?.hint?.map((hint: string, idx: number) => (
          <div key={idx} className="border-t-[1px] border-[#3f3e3e] py-2 px-4">
            <div
              onClick={() => handleClick(3 + idx)}
              className="cursor-pointer flex items-center justify-between"
            >
              <div className="flex py-1 items-center space-x-2 text-md">
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
