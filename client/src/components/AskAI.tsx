import axios from "axios";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const AskAI = ({ title, markdown }: { title: string; markdown: string }) => {
  const [currentText, setCurrentText] = useState<string[]>([
    `Hi there, I'm Let's CodeBot. Your AI assistant.\nHow can I help you with the ${title} problem?`,
  ]);
  // State to hold the user's current input in the text field.
  const [inputText, setInputText] = useState("");

  const indexis = markdown.indexOf("###");
  const questionReference =
    indexis !== -1 ? markdown.substring(0, indexis) : markdown;


  const handleInputSubmit = async () => {
    if (!inputText.trim()) return;

    setCurrentText((prev) => [...prev, inputText]);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/ai",
        {
          question: questionReference,
          userDoubt: inputText,
        },
        { withCredentials: true }
      );

      setCurrentText((prev) => [
        ...prev,
        response.data?.message || "Error occurred",
      ]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      setCurrentText((prev) => [
        ...prev,
        "Something went wrong. Please try again.",
      ]);
    } finally {
      setInputText("");
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-[70dvh] pt-4 px-2">
      {/* Messages */}
      <div>
        {currentText.map((text, index) => (
          <div
            key={index}
            className={`w-full py-2 flex ${
              index % 2 === 0 ? "" : "justify-end"
            } items-baseline space-x-3`}
          >
            {index % 2 !== 0 && (
              <div className="max-w-[400px] bg-[#2e2e2e] text-white p-4 rounded-xl shadow-md whitespace-pre-line">
                <Typewriter words={[text]} typeSpeed={70} />
              </div>
            )}
            <span className="text-sm font-semibold text-yellow-800 bg-yellow-200 px-3 py-2 rounded-full shadow">
              {index % 2 === 0 ? "AI" : "U"}
            </span>
            {index % 2 === 0 && (
              <div className="max-w-[400px] bg-[#2e2e2e] text-white p-4 rounded-xl shadow-md whitespace-pre-line">
                <Typewriter words={[text]} typeSpeed={70} />
              </div>
            )}
          </div>
        ))}
        <div />
      </div>

      {/* Input Bar */}
      <div className="flex space-x-4">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="px-4 py-2 w-full bg-[#2e2e2e] rounded-md outline-0"
          type="text"
          placeholder={`Ask a question related to ${title}...`}
          onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
        />
        <button
          onClick={handleInputSubmit}
          disabled={currentText.length % 2 === 0}
          className={`px-2 py-1 bg-amber-300 rounded-md ${
            currentText.length % 2 === 0
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default AskAI;
