type Question = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  companies: string[];
};
const ListQuestions = ({ questionData }: { questionData: Question[] }) => {
  return (
    <div className="w-full overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 px-4 py-3 text-gray-300 font-semibold text-sm">
        <span>Title</span>
        <span>Difficulty</span>
        <span className="hidden md:flex">Tags</span>
        <span className="hidden lg:flex">Companies</span>
      </div>

      {/* Table Rows */}
      {questionData.map((element, index) => (
        <div
          key={index}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 px-4 py-3 items-center ${
            index % 2 === 0 ? "bg-[#2e2e2e] rounded-2xl" : ""
          } text-gray-200 text-sm`}
        >
          {/* Title */}
          <span className="hover:text-blue-400 cursor-pointer flex items-center">
            <span className="mr-3">{index + 1}.</span>
            <span className="sm:hidden">
              {element.title.length > 20
                ? element.title.slice(0, 20) + "..."
                : element.title}
            </span>
            <span className="hidden sm:inline">{element.title}</span>
          </span>

          {/* Difficulty */}
          <span
            className={`font-semibold ${
              element.difficulty === "Easy"
                ? "text-[#51b06d]"
                : element.difficulty === "Medium"
                ? "text-[#efa339]"
                : "text-[#b05251]"
            }`}
          >
            {element.difficulty}
          </span>

          {/* Tags */}
          <span className="hidden md:flex flex-wrap gap-2">
            {element.tags && element.tags.length > 0 ? (
              element.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#3a3a3a] text-sm px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-400 italic">No tags</span>
            )}
          </span>

          {/* Companies */}
          <span className="hidden lg:flex flex-wrap gap-2">
            {element.companies.length > 0 ? (
              element.companies.slice(0, 2).map((company, i) => (
                <span
                  key={i}
                  className="bg-[#3a3a3a] text-sm px-2 py-1 rounded-full"
                >
                  {company}
                </span>
              ))
            ) : (
              <span className="text-gray-400 italic">No companies</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ListQuestions;
