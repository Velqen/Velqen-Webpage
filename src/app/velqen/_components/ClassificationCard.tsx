import React from "react";

interface ClassificationCardProps {
  processedContent?: string[][];
}

const ClassificationCard: React.FC<ClassificationCardProps> = ({
  processedContent,
}) => {
  if (!processedContent || processedContent.length === 0) return null;
  const headers = processedContent[0];
  const rows = processedContent.slice(1);
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-4 my-2 max-w-xl">
      <div className="font-semibold text-lg mb-2 text-gray-800">
        Classified Transactions
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-2 py-1 font-medium text-gray-600 border-b border-gray-200 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-gray-100">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-2 py-1 break-all">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassificationCard;
