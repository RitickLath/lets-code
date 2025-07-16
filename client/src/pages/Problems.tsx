import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ShowTopic from "@/components/ShowTopic";
import SearchQuestion from "@/components/SearchQuestion";
import ListQuestions from "@/components/ListQuestions";

const Problems = () => {
  const [page, setPage] = useState<number>(0);

  const fetchProblem = async (page: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/problems?page=${page}`
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        return [];
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      console.log("Error Occured While fetching data");
      return [];
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["problemData", page],
    queryFn: () => fetchProblem(page),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  if (isPending) return "Loading...";
  if (error) return "Error Fetching Problems";
  console.log(data);

  return (
    <div className="w-full">
      {/* Topic tags Button */}
      <ShowTopic />

      {/* Search bar */}
      <SearchQuestion />

      {/* Show all questions */}
      <ListQuestions questionData={data} />

      {/* Next/Previous Button */}
      <div className="flex justify-end space-x-3 mt-6">
        <button
          className="px-5 py-2 cursor-pointer bg-[#2e2e2e] text-gray-200 rounded-xl hover:bg-[#3a3a3a] hover:text-white shadow-sm transition duration-150 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          ← Previous
        </button>
        <button
          disabled={data.length < 10}
          onClick={() => setPage(page + 1)}
          className="px-5 py-2 cursor-pointer bg-[#2e2e2e] text-gray-200 rounded-xl hover:bg-[#3a3a3a] hover:text-white shadow-sm transition duration-150 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Problems;
