import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import {
  FaRegCopy,
  FaRedoAlt,
  FaChevronUp,
  FaChevronDown,
  FaPlay,
  FaCode,
} from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import SubmitResult from "./SubmitResult";
import { useQueryClient } from "@tanstack/react-query";

interface SubmissionResult {
  status: string;
  executionTime: string;
  memoryUsed: number;
  passed: number;
  failed: number;
  stderr: unknown;
}

const CodeBox = ({ fileName }: { fileName: string }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [starter, setStarter] = useState<string>("");
  const [textData, setTextData] = useState<string>("");
  const [heightFull, setHeightFull] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<SubmissionResult | null>(
    null
  );

  const fetchFile = async (source: string) => {
    try {
      const res = await fetch(source);
      const text = await res.text();
      setStarter(text);
      setTextData(text);
    } catch (error) {
      console.error("Error loading starter code:", error);
    }
  };

  useEffect(() => {
    fetchFile(`/StarterMd/${fileName}.md`);
  }, [fileName]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textData);
    } catch {
      console.error("Copy failed");
    }
  };

  const handleReset = () => {
    setTextData(starter);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitResult(null);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/submissions",
        {
          source_code: textData,
          function_name: fileName.replaceAll("-", ""),
          problemId: id,
          language: "Javascript",
        },
        {
          withCredentials: true,
        }
      );
      setSubmitResult(response.data.data);

      // to invalidate the state data of submissions.
      queryClient.invalidateQueries({
        queryKey: ["submissions"],
      });
      console.log(response.data.data);
      setOpen(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMsg = error?.response?.data?.error;

      if (
        errorMsg === "No token provided" ||
        errorMsg === "Invalid or expired token"
      ) {
        alert("Please log in to submit your code.");
      } else {
        alert("Submission failed. Please try again.");
        console.error("Submission error:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative h-full bg-[#1E1E1E] rounded-md shadow-lg border border-neutral-800">
      {/* Header */}
      <div className="px-4 mb-4 flex justify-between items-center bg-[#2E2E2E] text-white py-3 border-b border-neutral-700">
        <h1 className="text-sm font-semibold flex space-x-2 items-center">
          <FaCode className="text-lg text-yellow-500" />
          <span>Code Editor</span>
        </h1>
        <div className="flex items-center space-x-4 text-lg">
          <button
            className="hover:text-blue-500 cursor-pointer"
            onClick={handleCopy}
            title="Copy Code"
          >
            <FaRegCopy />
          </button>
          <button
            className="hover:text-blue-500 cursor-pointer"
            onClick={handleReset}
            title="Reset Code"
          >
            <FaRedoAlt />
          </button>
          <button
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => setHeightFull((prev) => !prev)}
          >
            {heightFull ? (
              <FaChevronUp title="Collapse" />
            ) : (
              <FaChevronDown title="Expand" />
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <Editor
        width="100%"
        height={heightFull ? "80vh" : "50vh"}
        defaultLanguage="javascript"
        theme="vs-dark"
        value={textData}
        onChange={(val) => setTextData(val || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />

      {/* Footer */}
      <div className="pt-6 bg-[#252526] border-t border-neutral-700 flex justify-between items-start flex-col md:flex-row gap-4 p-4">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`px-4 py-2 cursor-pointer text-sm font-semibold rounded-md flex items-center gap-2 ${
            submitting
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          <FaPlay />
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Submit Result Popup */}
      {open && submitResult && (
        <SubmitResult
          status={submitResult.status}
          executionTime={parseFloat(submitResult.executionTime || "0")}
          memoryUsed={submitResult.memoryUsed}
          passed={submitResult.passed}
          failed={submitResult.failed}
          stderr={submitResult.stderr}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default CodeBox;
