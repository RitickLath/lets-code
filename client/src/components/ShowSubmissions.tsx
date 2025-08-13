import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface detailResult {
  _id: string;
  language: string;
  status: string;
  executionTime: number;
  memoryUsed: number;
  createdAt: string;
}

const ShowSubmissions = ({ problemId }: { problemId: string }) => {
  const [page, setPage] = useState<number>(0);

  const fetchdata = async () => {
    const response = await axios.get(
      `/api/submissions/${problemId}?page=${page}`,
      { withCredentials: true }
    );
    console.log(response.data.data);
    return response.data.data;
  };

  const {
    isPending,
    data,
  }: { isPending: boolean; data: detailResult[] | undefined } = useQuery({
    queryKey: ["submissions", problemId, page],
    queryFn: fetchdata,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 15, // considered data fresh for 15 minutes
  });

  const handleNext = () => {
    if (data?.length === 15) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };
  if (isPending) {
    return <h1>Fetching...</h1>;
  }

  return (
    <div className="custom-scrollbar h-full min-h-[50dvh] px-3 text-sm w-full overflow-x-scroll pt-6">
      <div className="grid grid-cols-5 pb-2 font-semibold border-b border-gray-600">
        <h1>Status</h1>
        <h1>Time (IST)</h1>
        <h1>Language</h1>
        <h1>Memory</h1>
        <h1>Submitted</h1>
      </div>

      {data && data?.length > 0 ? (
        data?.map((element) => (
          <div
            key={element._id}
            className="grid grid-cols-5 items-center py-2 border-b border-gray-700"
          >
            <h1
              className={`${
                element.status === "Accepted"
                  ? "text-green-600"
                  : element.status === "Wrong Answer"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {element.status}
            </h1>
            <h1>{element.executionTime}s</h1>
            <h1>{element.language}</h1>
            <h1>{element.memoryUsed} KB</h1>
            <h1>
              {new Date(element.createdAt).toLocaleString("en-IN", {
                hour12: true,
                timeZone: "Asia/Kolkata",
              })}
            </h1>
          </div>
        ))
      ) : (
        <h1 className="pt-6 text-center">No Submissions Till Now</h1>
      )}

      {/* Pagination controls */}
      {data && data?.length > 0 && (
        <div className="flex justify-between items-center my-6">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="cursor-pointer px-4 py-1 rounded-full bg-[#6166b9] hover:bg-[#3c4069]"
          >
            Previous
          </button>
          <span>Page {page + 1}</span>
          <button
            onClick={handleNext}
            disabled={data.length < 15}
            className="cursor-pointer px-4 py-1 rounded-full bg-[#6166b9] hover:bg-[#3c4069]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowSubmissions;
