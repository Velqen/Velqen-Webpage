import React from "react";
import TransactionEditor from "../components/TransactionEditor/TransactionEditor";

const Transactions = () => {
  return (
    <div className="p-6 ">
      <div className="text-4xl mb-8 ">Editor</div>
      <TransactionEditor />
    </div>
  );
};

export default Transactions;
