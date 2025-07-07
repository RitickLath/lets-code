import { codeSnippets } from "@/constants/codeSnippet";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodingPlayground = () => {
  const [language, setLanguage] = useState<"javascript" | "java" | "python">(
    "javascript"
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[language]);
  };

  return (
    <div className="bg-[#2e2e2e] p-4 rounded-md w-full max-w-4xl mx-auto">
      <div className="flex space-x-4 mb-4">
        {["javascript", "java", "python"].map((lang) => (
          <button
            key={lang}
            onClick={() =>
              setLanguage(lang as "javascript" | "java" | "python")
            }
            className={`cursor-pointer px-4 py-1 rounded-md ${
              language === lang ? "bg-[#4b4b4b] text-white" : "text-[#92959c]"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ borderRadius: "6px" }}
      >
        {codeSnippets[language]}
      </SyntaxHighlighter>

      {/* Buttons */}
      <div className="flex space-x-3 mt-4">
        <button
          onClick={handleCopy}
          className="bg-[#4b4b4b] cursor-pointer text-white px-4 py-1 rounded hover:bg-[#3c3c3c]"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default CodingPlayground;
