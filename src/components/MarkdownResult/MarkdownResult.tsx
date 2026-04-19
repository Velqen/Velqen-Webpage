import ReactMarkdown from "react-markdown";

export function MarkdownResult({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse text-xs sm:text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
        th: ({ children }) => <th className="border border-white/20 px-3 py-2 text-left text-white font-semibold">{children}</th>,
        td: ({ children }) => <td className="border border-white/10 px-3 py-2 text-gray-300">{children}</td>,
        tr: ({ children }) => <tr className="even:bg-white/[0.02]">{children}</tr>,
        h2: ({ children }) => <h2 className="text-white font-bold text-base mt-6 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-fuchsia-300 font-semibold text-sm mt-4 mb-2 uppercase tracking-wider">{children}</h3>,
        p: ({ children }) => <p className="mb-2 text-gray-300">{children}</p>,
        li: ({ children }) => <li className="ml-4 list-disc text-gray-300 mb-1">{children}</li>,
        strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
