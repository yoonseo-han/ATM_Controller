export interface Card {
  cardNumber: string;
  pin: string;
}

export interface Account {
  id: string;
  cardNumber: string;
  balance: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'WITHDRAW' | 'DEPOSIT';
  amount: number;
  timestamp: Date;
}