export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "commission" | "bonus";
  amount: number;
  date: string;
  note?: string;
}

export interface BoundAddress {
  network: "ERC20" | "TRC20";
  address: string;
  label?: string;
}
