export class Account {
  constructor(
    private readonly id: string,
    private readonly cardNumber: string,
    private balance: number
  ) {}

  getId(): string {
    return this.id;
  }

  getCardNumber(): string {
    return this.cardNumber;
  }

  getBalance(): number {
    return this.balance;
  }
}