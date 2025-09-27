"use client";
import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InvGenDownload = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      // Download the visible invoice preview
      const element = document.getElementById("invoice-preview");
      if (!element) throw new Error("Invoice preview not found");

      // Render the DOM to canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      // Calculate dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to PDF
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Velqen-Invoice-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center m-4">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="bg-velqen-orange text-white px-4 py-2 rounded hover:bg-orange-500 transition disabled:opacity-60"
      >
        {loading ? "Generating..." : "Download Invoice"}
      </button>
    </div>
  );
};

export default InvGenDownload;
