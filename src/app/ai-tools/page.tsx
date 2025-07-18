"use client";

import GlideLink from "@/components/GlideLink/GlideLink";
import InvoiceExtraction from "@/components/InvoiceExtraction/InvoiceExtraction";
import RecordReconciliation from "@/components/RecordReconciliation/RecordReconciliation";
import ReportSection from "@/components/ReportSection/ReportSection";
import TransactionClassification from "@/components/TransactionClassification/TransactionClassification";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import { is } from "date-fns/locale";
import React, { useState } from "react";

const page = () => {
  const { isSmallDevice } = useDeviceSize();
  const [invoiceCsv, setInvoiceCsv] = useState<string[][]>([]);
  const [classifiedCsv, setClassifiedCsv] = useState<string[][]>([]);
  const [hasBeenClassified, setHasBeenClassified] = useState(false);

  return (
    <div className="pt-36">
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col justify-center items-center text-black">
          <h1
            className={`${
              isSmallDevice ? "text-4xl" : " text-6xl"
            } font-bold leading-tight`}
          >
            Pick Your <span className="velqen-gradient-text">AI</span> Tool
          </h1>
          <div className="mt-8">
            <GlideLink />
          </div>
        </div>
      </div>

      <div className="bg-background-sec w-full flex flex-col justify-center items-center mt-32">
        <div
          id="invoice-extraction"
          className={` ${
            isSmallDevice ? "w-[90%]" : "w-[80%]"
          }  flex flex-col justify-center items-center py-24`}
        >
          <h1
            className={` ${
              isSmallDevice ? "text-4xl" : "text-7xl"
            }  py-4  text-center`}
          >
            Invoice Extraction
          </h1>
          <p
            className={` ${
              isSmallDevice ? "text-xl" : "text-2xl"
            } text-center text-velqen-gray pb-14`}
          >
            Use AI to pull key details from invoices.
          </p>
          <InvoiceExtraction
            onExtractedRecords={(records) => {
              const csvFormat = records.map((r) =>
                Object.values(r).map(String)
              );
              setInvoiceCsv(csvFormat);
              setHasBeenClassified(false); // reset classification on new invoice data
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div
          id="transaction-classification"
          className={` ${
            isSmallDevice ? "w-[90%]" : "w-[80%]"
          }  flex flex-col justify-center items-center py-24`}
        >
          <h1
            className={` ${
              isSmallDevice ? "text-4xl" : "text-7xl"
            }  py-4  text-center`}
          >
            Transaction Classification
          </h1>
          <p
            className={` ${
              isSmallDevice ? "text-xl" : "text-2xl"
            } text-center text-velqen-gray pb-14`}
          >
            Understand where your money&#39;s going using AI.
          </p>
          <TransactionClassification
            csvData={invoiceCsv} // input invoice data
            onCsvParsed={(data) => {
              setClassifiedCsv(data);
              setHasBeenClassified(true);
            }}
          />
        </div>
      </div>
      <div className="bg-background-sec w-full flex flex-col justify-center items-center ">
        <div
          id="record-reconciliation"
          className={` ${
            isSmallDevice ? "w-[90%]" : "w-[80%]"
          }  flex flex-col justify-center items-center py-24`}
        >
          <h1
            className={` ${
              isSmallDevice ? "text-4xl" : "text-7xl"
            }  py-4  text-center`}
          >
            Record Reconciliation
          </h1>
          <p
            className={` ${
              isSmallDevice ? "text-xl" : "text-2xl"
            } text-center text-velqen-gray pb-14`}
          >
            Spot missed payments or duplicate charges automatically with AI.
          </p>
          <RecordReconciliation />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div
          id="transaction-classification"
          className={`${
            isSmallDevice ? "w-[90%] " : "w-[80%] "
          } flex flex-col justify-center items-center py-24`}
        >
          <ReportSection csvData={hasBeenClassified ? classifiedCsv : []} />
        </div>
      </div>
    </div>
  );
};

export default page;
