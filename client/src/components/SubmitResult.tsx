import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface ISubmitProp {
  status: string;
  executionTime: number;
  memoryUsed: number;
  passed: number;
  failed: number;
  setOpen: (val: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stderr: any;
}

const SubmitResult = ({
  status,
  executionTime,
  memoryUsed,
  passed,
  failed,
  stderr,
  setOpen,
}: ISubmitProp) => {
  const isSuccess = status == "Accepted";
  // console.log(isSuccess);
  console.log(status);
  console.log(memoryUsed);
  

  return (
    <div className="absolute bottom-0 w-full bg-[#1E1E1E] text-white border border-gray-700 p-4 z-50 shadow-xl animate-slide-up">
      {/* navbar */}
      <div className="flex justify-end">
        <IoClose
          onClick={() => setOpen(false)}
          className="text-xl text-red-400 cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          {isSuccess ? (
            <span className="text-green-400 flex items-center gap-2">
              <FaCheckCircle /> {status}
            </span>
          ) : (
            <span className="text-red-400 flex items-center gap-2">
              <FaTimesCircle /> {status}
            </span>
          )}
        </h2>
      </div>

      <div className="text-sm space-y-1">
        <p>
          <span className="text-gray-400">Execution Time:</span> {executionTime}
          s
        </p>
        <p>
          <span className="text-gray-400">Memory Used:</span> {memoryUsed} KB
        </p>
        <p>
          <span className="text-green-400">Passed:</span> {passed}{" "}
          <span className="text-red-400 ml-4">Failed:</span> {failed}
        </p>

        {stderr && (
          <div className="bg-[#2e2e2e] mt-2 p-2 rounded border border-red-500 text-red-300 text-sm">
            <strong>Error:</strong>
            <pre className="whitespace-pre-wrap break-words">
              {String(stderr)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitResult;
