// "use client";

// import GlideLink from "@/components/GlideLink/GlideLink";
// import HomeBanner from "@/components/HomeBanner/HomeBanner";
// import InvoiceExtraction from "@/components/InvoiceExtraction/InvoiceExtraction";
// import RecordReconciliation from "@/components/RecordReconciliation/RecordReconciliation";
// import ReportSection from "@/components/ReportSection/ReportSection";
// import TransactionClassification from "@/components/TransactionClassification/TransactionClassification";
// import { useDeviceSize } from "@/hooks/useDeviceSize";
// import Image from "next/image";
// import { useState } from "react";

// export default function Home() {
//   const { isSmallDevice } = useDeviceSize();
//   const [invoiceCsv, setInvoiceCsv] = useState<string[][]>([]);
//   const [classifiedCsv, setClassifiedCsv] = useState<string[][]>([]);
//   const [hasBeenClassified, setHasBeenClassified] = useState(false);

//   return isSmallDevice ? (
//     <div className="min-h-screen w-full flex flex-col justify-center items-center">
//       <HomeBanner />
//       <div className="w-[90%] flex flex-col justify-center items-center">
//         <div className="flex justify-center w-full">
//           <Image
//             src="/assets/phone2.2.png"
//             alt="Phone UI"
//             width={5000}
//             height={5000}
//             className="object-contain w-auto"
//           />
//         </div>
//         <h1 className="text-4xl py-4 font-bold">
//           Pick Your <span className=" velqen-gradient-text">AI</span> Tool
//         </h1>
//         <GlideLink />
//       </div>

//       <div className="bg-background-sec w-full flex flex-col justify-center items-center mt-16">
//         <div
//           id="invoice-extraction"
//           className="w-[90%] flex flex-col justify-center items-center py-24"
//         >
//           <h1 className="text-4xl py-4  text-center">Invoice Extraction</h1>
//           <p className="text-center text-xl text-velqen-gray pb-10">
//             Use AI to pull key details from invoices.
//           </p>
//           <InvoiceExtraction
//             onExtractedRecords={(records) => {
//               const csvFormat = records.map((r) =>
//                 Object.values(r).map(String)
//               );
//               setInvoiceCsv(csvFormat);
//               setHasBeenClassified(false); // reset classification on new invoice data
//             }}
//           />
//         </div>
//       </div>

//       <div className="w-full flex flex-col justify-center items-center">
//         <div
//           id="transaction-classification"
//           className="w-[90%] flex flex-col justify-center items-center py-24"
//         >
//           <h1 className="text-4xl py-4  text-center">
//             Transaction Classification
//           </h1>
//           <p className="text-center text-xl text-velqen-gray pb-10">
//             Understand where your money&#39;s going using AI.
//           </p>
//           <TransactionClassification
//             csvData={invoiceCsv} // input invoice data
//             onCsvParsed={(data) => {
//               setClassifiedCsv(data);
//               setHasBeenClassified(true);
//             }}
//           />
//         </div>
//       </div>

//       <div className="bg-background-sec w-full flex flex-col justify-center items-center">
//         <div
//           id="record-reconciliation"
//           className="w-[90%] flex flex-col justify-center items-center py-24"
//         >
//           <h1 className="text-4xl py-4  text-center">Record Reconciliation</h1>
//           <p className="text-center text-xl text-velqen-gray pb-10">
//             Spot missed payments or duplicate charges automatically with AI.
//           </p>
//           <RecordReconciliation />
//         </div>
//       </div>

//       <div className="w-full flex flex-col justify-center items-center">
//         <div
//           id="record-reconciliation"
//           className="w-[90%] flex flex-col justify-center items-center py-24"
//         >
//           <ReportSection csvData={hasBeenClassified ? classifiedCsv : []} />
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="min-h-screen w-full flex flex-col justify-center items-center pt-12">
//       <HomeBanner />

//       <div className="w-full h-[850px] flex items-center justify-center py-16">
//         <div className="w-[80%] flex flex-row items-center justify-between">
//           <div className="flex justify-center mx-10 h-[1000px]">
//             <Image
//               src="/assets/phone2.2.png"
//               alt="Phone UI"
//               width={5000}
//               height={5000}
//               className="object-contain w-auto"
//             />
//           </div>

//           <div className="flex flex-col justify-center items-start text-black pl-8">
//             <h1 className="text-6xl font-bold leading-tight">
//               Pick Your <span className="velqen-gradient-text">AI</span> Tool
//             </h1>
//             <div className="mt-8">
//               <GlideLink />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-background-sec w-full flex flex-col justify-center items-center mt-32">
//         <div
//           id="invoice-extraction"
//           className="w-[80%] flex flex-col justify-center items-center py-24"
//         >
//           <h1 className="text-7xl py-4  text-center">Invoice Extraction</h1>
//           <p className="text-center text-2xl text-velqen-gray pb-14">
//             Use AI to pull key details from invoices.
//           </p>
//           <InvoiceExtraction
//             onExtractedRecords={(records) => {
//               const csvFormat = records.map((r) =>
//                 Object.values(r).map(String)
//               );
//               setInvoiceCsv(csvFormat);
//               setHasBeenClassified(false); // reset classification on new invoice data
//             }}
//           />
//         </div>
//       </div>

//       <div className="w-full flex flex-col justify-center items-center">
//         <div
//           id="transaction-classification"
//           className="w-[80%] flex flex-col justify-center items-center py-24"
//         >
//           <h1 className="text-7xl py-4  text-center">
//             Transaction Classification
//           </h1>
//           <p className="text-center text-2xl text-velqen-gray pb-14">
//             Understand where your money&#39;s going using AI.
//           </p>
//           <TransactionClassification
//             csvData={invoiceCsv} // input invoice data
//             onCsvParsed={(data) => {
//               setClassifiedCsv(data);
//               setHasBeenClassified(true);
//             }}
//           />
//         </div>
//       </div>

//       <div className="bg-background-sec w-full flex flex-col justify-center items-center ">
//         <div
//           id="record-reconciliation"
//           className="w-[80%] flex flex-col justify-center items-center py-24"
//         >
//           <h1 className="text-7xl py-4  text-center">Record Reconciliation</h1>
//           <p className="text-center text-2xl text-velqen-gray pb-14">
//             Spot missed payments or duplicate charges automatically with AI.
//           </p>
//           <RecordReconciliation />
//         </div>
//       </div>

//       <div className="w-full flex flex-col justify-center items-center">
//         <div
//           id="transaction-classification"
//           className="w-[80%] flex flex-col justify-center items-center py-24"
//         >
//           <ReportSection csvData={hasBeenClassified ? classifiedCsv : []} />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-5xl md:text-8xl font-bold pb-10">
        <span className="">Simplicity</span> is Everything
      </h1>

      <p className="text-2xl md:text-4xl max-w-[1000px] text-velqen-gray">
        AI Financial Assistant in your Pocket
      </p>
    </div>
  );
}
