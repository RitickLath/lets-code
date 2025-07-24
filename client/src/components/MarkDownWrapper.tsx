import MarkdownPreview from "@uiw/react-markdown-preview";

const MarkdownWrapper = ({ children }: { children: string }) => {
  return (
    <div
      className=""
      style={{ backgroundColor: "transparent" }}
    >
      <MarkdownPreview
        className="list-inside [&>ul]:list-disc [&>ol]:list-decimal [&>ol]:-ml-2"
        source={children}
        components={{
          h1: ({ children }) => (
            <h1 className="text-[#9BC09C] text-xl sm:text-2xl md:text-3xl font-bold">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[#b36452] text-lg sm:text-xl md:text-2xl font-semibold">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[#DCA06D] text-lg sm:text-xl md:text-2xl font-medium">
              {children}
            </h3>
          ),
        }}
        style={{
          backgroundColor: "transparent",
          fontSize: "16px",
          lineHeight: "1.6",
        }}
      />
    </div>
  );
};

export default MarkdownWrapper;
