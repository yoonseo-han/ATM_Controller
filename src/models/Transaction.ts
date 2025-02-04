export interface Transaction {
  id: string;
  accountId: string;
  type: 'WITHDRAW' | 'DEPOSIT';
  amount: number;
  timestamp: Date;
}