import CodingPlayground from "./CodingPlayground";

const MultiLanguage = () => {
  return (
    <div className="flex flex-col w-full items-center py-16 px-4 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center max-w-3xl pb-4">
        Supports Multi-Language Code Submissions
      </h1>

      <p className="text-[#92959c] text-center max-w-xl text-base md:text-lg pb-6">
        Write, view, and copy clean code examples in your favorite programming
        languages. Instantly switch between Java, Python, and JavaScript with a
        single click.
      </p>

      {/* Language Tags */}
      <div className="flex gap-3 pb-8">
        {["Java", "Python", "JavaScript"].map((lang) => (
          <span
            key={lang}
            className="bg-[#2e2e2e] text-white text-sm px-3 py-1 rounded-full border border-gray-600"
          >
            {lang}
          </span>
        ))}
      </div>

      <CodingPlayground />
    </div>
  );
};

export default MultiLanguage;
