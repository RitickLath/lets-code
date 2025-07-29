import AskAI from "@/components/AskAI";
import CodeBox from "@/components/CodeBox";
import ProblemDetailPageNavbar from "@/components/ProblemDetailPageNavbar";
import ProblemDisplay from "@/components/ProblemDisplay";
import ShowSubmissions from "@/components/ShowSubmissions";
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const ProblemDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<Problem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>("");
  const [index, setIndex] = useState<1 | 2 | 3>(1);

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
        const mdText = await mdRes.text();
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

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className=" lg:max-h-[90dvh] overflow-hidden flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Question / Submissions / Ask AI/ Navbar */}
      <div className="custom-scrollbar lg:w-1/2 w-full lg:overflow-y-scroll">
        {/* Navbar */}
        <ProblemDetailPageNavbar setIndex={setIndex} />

        {/* Description */}
        {index == 1 && <ProblemDisplay data={data} markdown={markdown} />}

        {/* Submissions */}
        {index == 2 && <ShowSubmissions problemId={id || ""} />}

        {/* Ask AI */}
        {index == 3 && <AskAI />}
      </div>
      {/* Space for Solution */}
      <div className="lg:w-1/2 w-full">
        <CodeBox fileName={data.description || ""} />
      </div>
    </div>
  );
};

export default ProblemDetail;
