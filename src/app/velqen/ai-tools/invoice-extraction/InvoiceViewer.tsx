// components/InvoiceInput/InvoiceViewer.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  file: File;
};

const InvoiceViewer = ({ file }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url); // 🧼 Cleanup
    };
  }, [file]);

  if (!previewUrl) return null;

  const isImage = file.type.startsWith("image/");

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] h-[800px] bg-white">
        {isImage ? (
          <Image
            src={previewUrl}
            alt="Invoice"
            width={800}
            height={800}
            unoptimized
            className="w-full h-full object-contain bg-white"
          />
        ) : (
          <iframe
            src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&scrollbar=0`}
            className="w-full h-full border-0 bg-white"
            title="Invoice PDF"
          />
        )}
      </div>
    </div>
  );
};

export default InvoiceViewer;
