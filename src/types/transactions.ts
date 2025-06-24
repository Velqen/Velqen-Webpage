export type RecordItem = {
  id: string;
  date: string;
  amount_rm: number;
  main_category: string;
  sub_category: string;
  detailed_category: string;
  transaction_description: string;
  merchant_name: string;
};

export type MinimalRecord = Pick<
  RecordItem,
  "date" | "amount_rm" | "transaction_description" | "merchant_name"
>;
