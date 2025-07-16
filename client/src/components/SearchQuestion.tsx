import { FaSearch } from "react-icons/fa";

const SearchQuestion = () => {
  return (
    <div className="mt-2 lg:mt-6 relative w-full max-w-md">
      {/* Search Icon */}
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <FaSearch />
      </span>

      {/* Search Input */}
      <input
        className="w-full bg-[#2e2e2e] outline-none pl-10 pr-4 py-2 rounded-3xl text-sm text-white placeholder:text-gray-400"
        placeholder="Search Questions"
      />
    </div>
  );
};

export default SearchQuestion;
