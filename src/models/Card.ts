import { Account } from "./Account";

export class Card {
  constructor(
    private readonly cardNumber: string,
    private readonly pin: string,
    private accounts: Account[]
  ) {}

  getCardNumber(): string {
    return this.cardNumber;
  }

  validatePin(inputPin: string): boolean {
    return this.pin === inputPin;
  }

  getAccount(accountId: string): Account | undefined {
    return this.accounts.find(acc => acc.getId() === accountId);
  }

  getAccounts(): Account[] {
    return [...this.accounts];
  }
}