import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

const CodeBox = ({ fileName }: { fileName: string }) => {
  const [starter, setStarter] = useState<string>("");

  const fetchFile = async (source: string) => {
    const mdRes = await fetch(source);
    const text = await mdRes.text();
    setStarter(text);
  };

  useEffect(() => {
    fetchFile(`/StarterMd/${fileName}.md`);
  }, [fileName]);
  return (
    <div className="bg-[#1E1E1E] py-4">
      <Editor
        width="100%"
        height="50vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={starter}
      />
    </div>
  );
};

export default CodeBox;
