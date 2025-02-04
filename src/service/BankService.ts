import { Account } from "../models/Account";
import { Card } from "../models/Card";

export class BankService {
  private cards: Map<string, Card>;
  private accounts: Map<string, Account>;
  private cardAccountMapping: Map<string, string[]>;

  constructor() {
    this.cards = new Map();
    this.accounts = new Map();
    this.cardAccountMapping = new Map();

    this.initializeTestData();
  }

  private initializeTestData() {
    this.cards.set('1234-5678', {
        cardNumber: '1234-5678',
        pin: '1234'
    });

    this.accounts.set('1', {
        id: '1',
        balance: 500
    });

    this.cardAccountMapping.set('1234-5678', ['1']);
  }

  validateCard(cardNumber: string): Card | null {
    console.log(cardNumber);
    const card = this.cards.get(cardNumber);
    return card || null;
  }

  validatePin(cardNumber: string, pinNumber: string): boolean {
    const card = this.cards.get(cardNumber);
    return card?.pin === pinNumber;
  }

  getAccounts(cardNumber: string): Account[] {
    return [];
  }

  getAccountBalance(accountId: string): number {
    return 0;
  }

  withdraw(accountId: string, amount: number): boolean {

    return true;
  }

  deposit(accountId: string, amount: number): boolean {

    return true;
  }
}