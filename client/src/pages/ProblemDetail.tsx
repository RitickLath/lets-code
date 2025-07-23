import ProblemDisplay from "@/components/ProblemDisplay";
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
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (qId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/problems/id/${qId}`
      );
      if (!response.data.success) {
        setError(response.data.error || "Error Occurred While Fetching Data");
      } else {
        setData(response.data.data);
      }
    } catch (e) {
      setError("Something went wrong while fetching the problem.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id || "");
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="flex">
      {/* Question */}
      <div className="flex-1">
        <ProblemDisplay />
      </div>

      {/* Space for Solution */}
      <div className="lg:flex-1"></div>
    </div>
  );
};

export default ProblemDetail;
